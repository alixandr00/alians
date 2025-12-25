import React, { useState, useMemo, useRef, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import { CarCard } from '../AutoFromChina/CarCard';
import './CustomOrder.css';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { row1Brands, row2Brands } from '../../data/CarsData';

export const CustomOrder = ({ searchTerm }) => {
    const { t } = useTranslation();
    const location = useLocation();

    // Рефы
    const pickerRef = useRef(null);
    const catalogContentRef = useRef(null);

    // Состояния данных
    const [dbCars, setDbCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState(null);
    const [currentMainImage, setCurrentMainImage] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    // Состояния фильтров
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [yearRange, setYearRange] = useState([2010, 2025]);
    const [mileageRange, setMileageRange] = useState([0, 300000]);
    const [transmission, setTransmission] = useState('Все');
    const [fuelType, setFuelType] = useState('Все');

    // Пагинация
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;

    const [, setAppliedFilters] = useState({
        brands: [], price: [0, 100000], year: [2010, 2025],
        mileage: [0, 300000], transmission: 'Все', fuel: 'Все'
    });

    // 1. Загрузка данных из Supabase и обработка перехода из поиска
    useEffect(() => {
        let isMounted = true;
        const fetchAllCars = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('car-cards').select('*');
            if (isMounted) {
                if (error) {
                    console.error("Ошибка Supabase:", error);
                } else {
                    const cars = data || [];
                    setDbCars(cars);

                    // Если пришли по ссылке на конкретную машину
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

    // 2. Логика закрытия окна моделей при клике МИМО
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                const isBrandClick = event.target.closest('.brandIconCard');
                // Если кликнули не по окну и не по иконке бренда — закрываем
                if (!isBrandClick) {
                    setIsPickerOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Группировка моделей для отображения (Audi -> модели, BMW -> модели)
    const groupedModels = useMemo(() => {
        const allBrands = [...row1Brands, ...row2Brands];
        return allBrands
            .filter(brand => selectedBrands.includes(brand.name))
            .map(brand => ({
                brandName: brand.name,
                models: brand.models || []
            }));
    }, [selectedBrands]);

    // Переключение бренда
    const toggleBrand = (brandName) => {
        setSelectedBrands(prev =>
            prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
        );
        setIsPickerOpen(true); // Открываем окно при выборе бренда
    };

    // Переключение модели
    const toggleModel = (modelName) => {
        setSelectedModels(prev =>
            prev.includes(modelName) ? prev.filter(m => m !== modelName) : [...prev, modelName]
        );
    };

    // ГЛАВНЫЙ ФИЛЬТР
    const filteredCars = useMemo(() => {
        return dbCars.filter(car => {
            const brandInDb = String(car.brand || '').trim().toLowerCase();
            const titleInDb = String(car.title || '').trim().toLowerCase();

            // Фильтр по бренду
            const matchBrand = selectedBrands.length === 0 ||
                selectedBrands.some(b => b.toLowerCase() === brandInDb);

            // Фильтр по моделям
            const matchModel = selectedModels.length === 0 ||
                selectedModels.some(m => titleInDb.includes(m.toLowerCase()));

            // Фильтр по цене
            const carPrice = Number(car.price) || 0;
            const matchPrice = carPrice >= priceRange[0] && carPrice <= priceRange[1];

            // Фильтр по году
            const carYear = Number(car.year) || 0;
            const matchYear = carYear >= yearRange[0] && carYear <= yearRange[1];

            // Фильтр по пробегу
            const carMileage = Number(car.mileage);
            const matchMileage = (carMileage <= 0) ? true : (carMileage >= mileageRange[0] && carMileage <= mileageRange[1]);

            // Топливо и КПП
            const matchTrans = transmission === 'Все' || car.transmission === transmission;
            const matchFuel = fuelType === 'Все' || car.fuel === fuelType;

            // Поиск по слову
            const searchLower = (searchTerm || '').trim().toLowerCase();
            const matchSearch = searchLower === '' || titleInDb.includes(searchLower) || brandInDb.includes(searchLower);

            return matchBrand && matchModel && matchPrice && matchYear && matchMileage && matchTrans && matchFuel && matchSearch;
        });
    }, [dbCars, selectedBrands, selectedModels, priceRange, yearRange, mileageRange, transmission, fuelType, searchTerm]);

    const currentCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    // Сброс всех фильтров
    const resetFilters = () => {
        setSelectedBrands([]);
        setSelectedModels([]);
        setPriceRange([0, 100000]);
        setYearRange([2010, 2025]);
        setMileageRange([0, 300000]);
        setTransmission('Все');
        setFuelType('Все');
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

    return (
        <div className="catalogPage">
            <div className="catalogContainer">
                <aside className="filterSidebar">
                    <h3 className="filterMainTitle">{t('filter_title')}</h3>

                    {/* Выбор брендов - Ряд 1 */}
                    <div className="brandSwipeRow">
                        {row1Brands.map(brand => (
                            <div
                                key={brand.name}
                                className={`brandIconCard ${selectedBrands.includes(brand.name) ? 'active' : ''}`}
                                onClick={() => toggleBrand(brand.name)}
                            >
                                <img src={brand.icon} alt={brand.name} />
                                <span>{brand.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Выбор брендов - Ряд 2 */}
                    <div className="brandSwipeRow">
                        {row2Brands.map(brand => (
                            <div
                                key={brand.name}
                                className={`brandIconCard ${selectedBrands.includes(brand.name) ? 'active' : ''}`}
                                onClick={() => toggleBrand(brand.name)}
                            >
                                <img src={brand.icon} alt={brand.name} />
                                <span>{brand.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* ОКНО ВЫБОРА МОДЕЛЕЙ (ГРУППИРОВАННОЕ) */}
                    {isPickerOpen && selectedBrands.length > 0 && (
                        <div className="modelsFloatingPicker" ref={pickerRef}>
                            <div className="pickerHeader">
                                <span>{t('filter_models_title')}</span>
                                <div className="pickerActions">
                                    {/* КНОПКА ПРИМЕНИТЬ */}
                                    <button className="applyModelsBtn" onClick={() => setIsPickerOpen(false)}>
                                        Применить
                                    </button>
                                    <button className="clearModelsBtn" onClick={() => setSelectedModels([])}>
                                        {t('btn_reset')}
                                    </button>
                                </div>
                            </div>
                            <div className="groupedModelsContainer">
                                {groupedModels.map(group => (
                                    <div key={group.brandName} className="brandModelGroup">
                                        <h4 className="groupBrandTitle">{group.brandName}</h4>
                                        <div className="modelsGridMini">
                                            {group.models.map(model => (
                                                <button
                                                    key={model}
                                                    className={`modelChip ${selectedModels.includes(model) ? 'active' : ''}`}
                                                    onClick={() => toggleModel(model)}
                                                >
                                                    {model}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Блок Цена */}
                    <div className="filterBlockWhite">
                        <label>{t('filter_price')} ($)</label>
                        <div className="rangeLabelsGreen">
                            <span>{priceRange[0].toLocaleString()}</span> — <span>{priceRange[1].toLocaleString()}</span>
                        </div>
                        <div className="rangeSliderUI">
                            <input type="range" min="0" max="100000" step="1000" value={priceRange[0]} onChange={(e) => {
                                const v = Number(e.target.value);
                                if (v <= priceRange[1]) setPriceRange([v, priceRange[1]]);
                            }} className="dualInput" />
                            <input type="range" min="0" max="100000" step="1000" value={priceRange[1]} onChange={(e) => {
                                const v = Number(e.target.value);
                                if (v >= priceRange[0]) setPriceRange([priceRange[0], v]);
                            }} className="dualInput" />
                            <div className="trackGreen"></div>
                        </div>
                    </div>

                    {/* Блок Год */}
                    <div className="filterBlockWhite">
                        <label>{t('filter_year')}</label>
                        <div className="rangeLabelsGreen">
                            <span>{yearRange[0]}</span> — <span>{yearRange[1]}</span>
                        </div>
                        <div className="rangeSliderUI">
                            <input type="range" min="2010" max="2025" step="1" value={yearRange[0]} onChange={(e) => {
                                const v = Number(e.target.value);
                                if (v <= yearRange[1]) setYearRange([v, yearRange[1]]);
                            }} className="dualInput" />
                            <input type="range" min="2010" max="2025" step="1" value={yearRange[1]} onChange={(e) => {
                                const v = Number(e.target.value);
                                if (v >= yearRange[0]) setYearRange([yearRange[0], v]);
                            }} className="dualInput" />
                            <div className="trackGreen"></div>
                        </div>
                    </div>

                    {/* Блок Топливо */}
                    <div className="filterBlockWhite">
                        <label>{t('filter_fuel')}</label>
                        <div className="fuelGrid">
                            {['Все', 'Бензин', 'Электро', 'Гибрид'].map(type => (
                                <button key={type} className={`fuelBtn ${fuelType === type ? 'active' : ''}`} onClick={() => setFuelType(type)}>{type}</button>
                            ))}
                        </div>
                    </div>

                    <div className="filterFooterRow">
                        <button className="mainApplyBtn" onClick={handleApplyFilters}>{t('btn_show')}</button>
                        <button className="resetBtnSimple" onClick={resetFilters}>{t('btn_reset')}</button>
                    </div>
                </aside>

                <main className="catalogContent" ref={catalogContentRef}>
                    {loading ? (
                        <div className="noResults">{t('loading')}</div>
                    ) : selectedCar ? (
                        <div className="carDetailContainer">
                            <button className="backToListBtn" onClick={() => { setSelectedCar(null); setCurrentMainImage(null); }}>
                                ← {t('btn_back')}
                            </button>
                            <div className="detailContent">
                                <div className="gallerySection">
                                    <div className="mainPhotoBox">
                                        <img src={currentMainImage || selectedCar.image} alt="Car" className="detailImageMain" />
                                    </div>
                                </div>
                                <div className="detailHeader">
                                    <h1>{selectedCar.title}</h1>
                                    <div className="detailPriceLarge">${selectedCar.price.toLocaleString()}</div>
                                </div>
                                <div className="specsCard">
                                    <div className="specRow"><span>{t('spec_year')}</span> <b>{selectedCar.year}</b></div>
                                    <div className="specRow"><span>{t('spec_mileage')}</span> <b>{selectedCar.mileage?.toLocaleString()} км</b></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="resultsHeader">{t('found_cars')} <span>{filteredCars.length}</span></div>
                            <div className="carsList">
                                {currentCars.length > 0 ? (
                                    currentCars.map(car => (
                                        <CarCard
                                            key={car.id}
                                            car={car}
                                            isCatalog={true}
                                            onClick={() => {
                                                setSelectedCar(car);
                                                setCurrentMainImage(car.image);
                                                setTimeout(scrollToContent, 100);
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="noResults">{t('no_results')}</div>
                                )}
                            </div>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`pageBtn ${currentPage === i + 1 ? 'active' : ''}`}
                                            onClick={() => { setCurrentPage(i + 1); scrollToContent(); }}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};