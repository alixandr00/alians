/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { CarCard, CarCardSkeleton } from '../AutoFromChina/CarCard';
import './CustomOrder.css';
import { useTranslation } from 'react-i18next';
import { row1Brands, row2Brands } from '../../data/CarsData';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FilterSidebar } from './FilterSidebar';

export const CustomOrder = ({ searchTerm }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const pickerRef = useRef(null);
    const catalogContentRef = useRef(null);

    const [dbCars, setDbCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState(null);
    const [currentMainImage, setCurrentMainImage] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [yearRange, setYearRange] = useState([2010, 2025]);
    const [mileageRange, setMileageRange] = useState([0, 300000]);
    const [transmission, setTransmission] = useState('Все');
    const [fuelType, setFuelType] = useState('Все');
    const [selectedColors, setSelectedColors] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;

    const [, setAppliedFilters] = useState({
        brands: [], price: [0, 100000], year: [2010, 2025],
        mileage: [0, 300000], transmission: 'Все', fuel: 'Все'
    });

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const brand = searchParams.get('brand');
        const model = searchParams.get('model');
        const minP = searchParams.get('minPrice');
        const maxP = searchParams.get('maxPrice');

        if (brand || model || minP || maxP) {
            // 1. Сначала ставим бренд
            if (brand && brand !== '') {
                setSelectedBrands([brand]);
            }

            // 2. Ставим цену
            if (minP || maxP) {
                setPriceRange([Number(minP) || 0, Number(maxP) || 100000]);
            }

            // 3. Ставим модель с небольшой задержкой, 
            // чтобы стейт бренда успел обновиться и фильтр не сбросил модель
            if (model && model !== '') {
                const decodedModel = decodeURIComponent(model).trim();
                setIsPickerOpen(true);

                // Используем setTimeout на 0, чтобы это упало в конец очереди выполнения
                setTimeout(() => {
                    setSelectedModels([decodedModel]);
                }, 50);
            }

            setCurrentPage(1);
            // Очищаем URL, чтобы при ручном обновлении страницы фильтры не залипали
            navigate('/catalog', { replace: true });
        }
    }, [searchParams, navigate]);

    // Загрузка из базы
    useEffect(() => {
        let isMounted = true;
        const fetchAllCars = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('car-cards').select('*');
            if (isMounted) {
                if (error) console.error("Ошибка Supabase:", error);
                else {
                    const cars = data || [];
                    setDbCars(cars);
                    if (location.state?.selectedCarId) {
                        const foundCar = cars.find(c => c.id === location.state.selectedCarId);
                        if (foundCar) {
                            setSelectedCar(foundCar);
                            setCurrentMainImage(foundCar.image);
                            setTimeout(() => {
                                catalogContentRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                            window.history.replaceState({}, document.title);
                        }
                    }
                }
                setLoading(false);
            }
        };
        fetchAllCars();
        return () => { isMounted = false; };
    }, [location.state]);

    // Клик снаружи
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                if (!event.target.closest('.brandIconCard')) {
                    setIsPickerOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const groupedModels = useMemo(() => {
        const allBrands = [...row1Brands, ...row2Brands];
        return allBrands
            .filter(brand => selectedBrands.includes(brand.name))
            .map(brand => ({ brandName: brand.name, models: brand.models || [] }));
    }, [selectedBrands]);

    const toggleBrand = (brandName) => {
        setSelectedBrands(prev => {
            const isRemoving = prev.includes(brandName);
            const nextBrands = isRemoving ? prev.filter(b => b !== brandName) : [...prev, brandName];
            if (nextBrands.length === 0) setIsPickerOpen(false);
            else if (!isRemoving) setIsPickerOpen(true);
            return nextBrands;
        });
    };

    // Очистка моделей при удалении бренда
    useEffect(() => {
        const allBrands = [...row1Brands, ...row2Brands];
        const availableModels = allBrands
            .filter(b => selectedBrands.includes(b.name))
            .flatMap(b => b.models || []);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedModels(prev => prev.filter(m => availableModels.includes(m)));
    }, [selectedBrands]);

    const toggleModel = (modelName) => {
        setSelectedModels(prev =>
            prev.includes(modelName) ? prev.filter(m => m !== modelName) : [...prev, modelName]
        );
    };

    const filteredCars = useMemo(() => {
        return dbCars.filter(car => {
            const brandInDb = String(car.brand || '').trim().toLowerCase();
            const titleInDb = String(car.title || '').trim().toLowerCase();
            const carPrice = Number(car.price) || 0;
            const carYear = Number(car.year) || 0;
            const carMileage = Number(car.mileage) || 0;

            // --- ЛОГИКА ЦВЕТА ---
            // Если массив выбранных цветов пуст - показываем все.
            // Иначе проверяем, есть ли цвет машины в списке выбранных.
            const matchColor = selectedColors.length === 0 || selectedColors.includes(car.color);

            const matchBrand = selectedBrands.length === 0 || selectedBrands.some(b => b.toLowerCase() === brandInDb);
            const matchModel = selectedModels.length === 0 || selectedModels.some(m => {
                const mLower = m.toLowerCase().trim();
                return titleInDb.includes(mLower) || mLower.includes(titleInDb);
            });
            const matchPrice = carPrice >= priceRange[0] && carPrice <= priceRange[1];
            const matchYear = carYear >= yearRange[0] && carYear <= yearRange[1];
            const matchMileage = (carMileage <= 0) ? true : (carMileage >= mileageRange[0] && carMileage <= mileageRange[1]);
            const matchTrans = transmission === 'Все' || car.transmission === transmission;
            const matchFuel = fuelType === 'Все' || car.fuel === fuelType;
            const searchLower = (searchTerm || '').trim().toLowerCase();
            const matchSearch = searchLower === '' || titleInDb.includes(searchLower) || brandInDb.includes(searchLower);

            // НЕ ЗАБУДЬ ДОБАВИТЬ matchColor В ИТОГОВЫЙ RETURN
            return matchBrand && matchModel && matchPrice && matchYear && matchMileage && matchTrans && matchFuel && matchSearch && matchColor;
        });
        // ДОБАВЬ selectedColors В МАССИВ ЗАВИСИМОСТЕЙ useMemo
    }, [dbCars, selectedBrands, selectedModels, priceRange, yearRange, mileageRange, transmission, fuelType, searchTerm, selectedColors]);

    const currentCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    const resetFilters = () => {
        setSelectedBrands([]);
        setSelectedModels([]);
        setPriceRange([0, 100000]);
        setYearRange([2010, 2025]);
        setMileageRange([0, 300000]);
        setTransmission('Все');
        setFuelType('Все');
        setSelectedColors([]);
        setCurrentPage(1);
    };

    const handleApplyFilters = () => {
        setAppliedFilters({ brands: selectedBrands, price: priceRange, year: yearRange, mileage: mileageRange, transmission, fuel: fuelType });
        setSelectedCar(null);
        setCurrentPage(1);
    };

    const scrollToContent = () => {
        if (catalogContentRef.current) {
            window.scrollTo({
                top: catalogContentRef.current.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
    const toggleColor = (colorId) => {
        setSelectedColors(prev =>
            prev.includes(colorId)
                ? prev.filter(c => c !== colorId)
                : [...prev, colorId]
        );
    };

    return (
        <div className="catalogPage">
            <div className="catalogContainer">
                {/* Компонент фильтров */}
                <FilterSidebar
                    selectedBrands={selectedBrands}
                    toggleBrand={toggleBrand}
                    isPickerOpen={isPickerOpen}
                    setIsPickerOpen={setIsPickerOpen}
                    pickerRef={pickerRef}
                    groupedModels={groupedModels}
                    selectedModels={selectedModels}
                    toggleModel={toggleModel}
                    setSelectedModels={setSelectedModels}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    yearRange={yearRange}
                    setYearRange={setYearRange}
                    fuelType={fuelType}
                    setFuelType={setFuelType}
                    selectedColors={selectedColors}
                    toggleColor={toggleColor}
                    handleApplyFilters={handleApplyFilters}
                    resetFilters={resetFilters}

                />

                <main className="catalogContent" ref={catalogContentRef}>
                    {loading ? (
                        /* СКЕЛЕТОНЫ ПРИ ЗАГРУЗКЕ */
                        <div className="carsList">
                            <CarCardSkeleton isCatalog={true} />
                            <CarCardSkeleton isCatalog={true} />
                            <CarCardSkeleton isCatalog={true} />
                        </div>
                    ) : selectedCar ? (
                        /* Детальная страница машины */
                        <div className="carDetailContainer">
                            <button className="backToListBtn" onClick={() => { setSelectedCar(null); setCurrentMainImage(null); }}>
                                ← {t('btn_back')}
                            </button>
                            <div className="detailContent">
                                <div className="gallerySection">
                                    <div className="mainPhotoBox">
                                        <img src={currentMainImage || selectedCar.image} alt="Car" className="detailImageMain" />
                                    </div>
                                    {selectedCar.images && selectedCar.images.length > 0 && (
                                        <div className="thumbnailsRow">
                                            {!selectedCar.images.includes(selectedCar.image) && (
                                                <img src={selectedCar.image} alt="thumb-main"
                                                    className={`thumbImg ${currentMainImage === selectedCar.image ? 'active' : ''}`}
                                                    onClick={() => setCurrentMainImage(selectedCar.image)} />
                                            )}
                                            {selectedCar.images.map((imgUrl, idx) => (
                                                <img key={idx} src={imgUrl} alt={`thumb-${idx}`}
                                                    className={`thumbImg ${currentMainImage === imgUrl ? 'active' : ''}`}
                                                    onClick={() => setCurrentMainImage(imgUrl)} />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="detailInfoSection">
                                    <div className="detailHeader">
                                        <h1>{selectedCar.title}</h1>
                                        <div className="detailPriceLarge">${selectedCar.price?.toLocaleString()}</div>
                                    </div>
                                    <div className="specsContainer">
                                        <h3 className="specsTitle">{t('specs_title') || 'Характеристики'}</h3>
                                        <div className="specsGridProfessional">
                                            <div className="specCard">
                                                <div className="specText">
                                                    <span className="specLabel">{t('spec_year')}</span>
                                                    <span className="specValue">{selectedCar.year}</span>
                                                </div>
                                            </div>
                                            <div className="specCard">
                                                <div className="specText">
                                                    <span className="specLabel">{t('spec_mileage')}</span>
                                                    <span className="specValue">{selectedCar.mileage?.toLocaleString()} км</span>
                                                </div>
                                            </div>
                                            <div className="specCard">
                                                <div className="specText">
                                                    <span className="specLabel">{t('filter_transmission')}</span>
                                                    <span className="specValue">{selectedCar.transmission || '—'}</span>
                                                </div>
                                            </div>
                                            <div className="specCard">
                                                <div className="specText">
                                                    <span className="specLabel">{t('filter_fuel')}</span>
                                                    <span className="specValue">{selectedCar.fuel || '—'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedCar.description && (
                                        <div className="detailDescription">
                                            <h3>{t('description_title') || 'Описание'}</h3>
                                            <p>{selectedCar.description}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Список найденных машин */
                        <>
                            <div className="resultsHeader">{t('found_cars')} <span>{filteredCars.length}</span></div>
                            <div className="carsList">
                                {currentCars.length > 0 ? (
                                    currentCars.map(car => (
                                        <CarCard key={car.id} car={car} isCatalog={true}
                                            onClick={() => {
                                                setSelectedCar(car);
                                                setCurrentMainImage(car.image);
                                                setTimeout(scrollToContent, 100);
                                            }} />
                                    ))
                                ) : (
                                    <div className="noResults">{t('no_results')}</div>
                                )}
                            </div>
                            {totalPages > 1 && (
                                <div className="pagination">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button key={i} className={`pageBtn ${currentPage === i + 1 ? 'active' : ''}`}
                                            onClick={() => { setCurrentPage(i + 1); scrollToContent(); }}>{i + 1}</button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}