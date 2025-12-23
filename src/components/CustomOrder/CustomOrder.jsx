import React, { useState, useMemo, useRef, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient'; // ПРОВЕРЬ ПУТЬ
import { CarCard } from '../AutoFromChina/CarCard';
import './CustomOrder.css';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { row1Brands, row2Brands } from '../../data/CarsData';



export const CustomOrder = ({ searchTerm }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const catalogContentRef = useRef(null);
    const [dbCars, setDbCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [yearRange, setYearRange] = useState([2010, 2025]);
    const [mileageRange, setMileageRange] = useState([0, 300000]);
    const [transmission, setTransmission] = useState('Все');
    const [fuelType, setFuelType] = useState('Все');
    const [currentMainImage, setCurrentMainImage] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;

    const handleDeleteCar = async (car) => {
        try {
            const getFilePath = (url) => {
                if (!url) return null;
                const parts = url.split('/');
                return parts[parts.length - 1]; // Берем последнюю часть (имя файла)
            };

            const mainImagePath = getFilePath(car.image);
            const galleryPaths = (car.images || []).map(url => getFilePath(url)).filter(p => p !== null);

            const allPathsToDelete = [mainImagePath, ...galleryPaths];

            // 2. Удаляем файлы из Storage
            if (allPathsToDelete.length > 0) {
                const { error: storageError } = await supabase
                    .storage
                    .from('car-images') // Твой бакет
                    .remove(allPathsToDelete);

                if (storageError) console.error("Ошибка удаления файлов из Storage:", storageError);
            }

            // 3. Удаляем саму запись из таблицы БД
            const { error: dbError } = await supabase
                .from('car-cards')
                .delete()
                .eq('id', car.id);

            if (dbError) throw dbError;

            // 4. Обновляем интерфейс
            setDbCars(prev => prev.filter(c => c.id !== car.id));
            alert("Автомобиль и все фото успешно удалены!");

        } catch (error) {
            console.error("Ошибка при полном удалении:", error);
            alert("Произошла ошибка при удалении");
        }
    };

    const [, setAppliedFilters] = useState({
        brands: [],
        price: [0, 100000],
        year: [2010, 2025],
        mileage: [0, 300000],
        transmission: 'Все',
        fuel: 'Все'
    });

    useEffect(() => {
        const fetchAllCars = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('car-cards')
                .select('*');

            if (error) {
                console.error("Ошибка:", error);
            } else {
                setDbCars(data || []);

                // 4. ПРОВЕРКА: Если мы пришли из поиска (есть ID в state)
                if (location.state && location.state.selectedCarId) {
                    const foundCar = data.find(c => c.id === location.state.selectedCarId);

                    if (foundCar) {
                        setSelectedCar(foundCar); // Сразу открываем карточку
                        setCurrentMainImage(foundCar.image); // Ставим фото

                        // Прокручиваем экран к машине
                        setTimeout(() => {
                            if (catalogContentRef.current) {
                                catalogContentRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 100);

                        // Очищаем state, чтобы при обновлении страницы она не открывалась снова
                        window.history.replaceState({}, document.title);
                    }
                }
            }
            setLoading(false);
        };
        fetchAllCars();
    }, [location.state]); // Добавляем

    // 2. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (ВНЕ useEffect)
    const toggleBrand = (brandName) => {
        setSelectedBrands(prev =>
            prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
        );
    };

    const handleDualRange = (e, index, range, setRange) => {
        const val = Number(e.target.value);
        const nextRange = [...range];
        nextRange[index] = val;
        if (index === 0 && val <= range[1]) setRange(nextRange);
        else if (index === 1 && val >= range[0]) setRange(nextRange);
    };

    const handleApplyFilters = () => {
        setAppliedFilters({
            brands: selectedBrands,
            price: priceRange,
            year: yearRange,
            mileage: mileageRange,
            transmission: transmission,
            fuel: fuelType
        });
        setSelectedCar(null);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        const resetData = {
            brands: [],
            price: [0, 100000],
            year: [2010, 2025],
            mileage: [0, 300000],
            transmission: 'Все',
            fuel: 'Все'
        };
        setSelectedBrands(resetData.brands);
        setPriceRange(resetData.price);
        setYearRange(resetData.year);
        setMileageRange(resetData.mileage);
        setTransmission(resetData.transmission);
        setFuelType(resetData.fuel);
        setAppliedFilters(resetData);
        setSelectedCar(null);
        setCurrentPage(1);
    };

    const scrollToContent = () => {
        if (catalogContentRef.current) {
            const yOffset = -80;
            const element = catalogContentRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const filteredCars = useMemo(() => {
        return dbCars.filter(car => {
            const matchBrand = selectedBrands.length === 0 || selectedBrands.some(selected => {
                const brandInDb = String(car.brand || '').trim().toLowerCase();
                const selectedLow = selected.trim().toLowerCase();
                return brandInDb === selectedLow; // Точное совпадение бренда
            });
            // 2. Фильтр по цене
            const carPrice = Number(car.price) || 0;
            const matchPrice = carPrice >= priceRange[0] && carPrice <= priceRange[1];
            // 3. Фильтр по году
            const carYear = Number(car.year) || 0;
            const matchYear = carYear >= yearRange[0] && carYear <= yearRange[1];

            // 4. Фильтр по пробегу
            const carMileage = Number(car.mileage);
            const matchMileage = (carMileage === -1 || carMileage === 0)
                ? true // Если пробег -1 или 0, всегда показываем (считаем за новое авто)
                : (carMileage >= mileageRange[0] && carMileage <= mileageRange[1]);

            // 5. Тип топлива и КПП
            const matchTrans = transmission === 'Все' || car.transmission === transmission;
            const matchFuel = fuelType === 'Все' || car.fuel === fuelType;

            const searchLower = (searchTerm || '').toLowerCase();
            const matchSearch =
                String(car.title || '').toLowerCase().includes(searchLower) ||
                String(car.brand || '').toLowerCase().includes(searchLower);

            return matchBrand && matchPrice && matchYear && matchMileage && matchTrans && matchFuel && matchSearch;
        });
    }, [dbCars, selectedBrands, priceRange, yearRange, mileageRange, transmission, fuelType, searchTerm]);

    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    const currentCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

    return (
        <div className="catalogPage">
            <div className="catalogContainer">
                <aside className="filterSidebar">
                    <h3 className="filterMainTitle">{t('filter_title')}</h3>

                    <div className="brandSwipeRow">
                        {[row1Brands, row2Brands].map((row, i) => (
                            <div key={i} className="brandSwipeRow">
                                {row.map(brand => (
                                    <div key={brand.name} className={`brandIconCard ${selectedBrands.includes(brand.name) ? 'active' : ''}`} onClick={() => toggleBrand(brand.name)}>
                                        <img src={brand.icon} alt={brand.name} />
                                        <span>{brand.name}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

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

                    <div className="filterBlockWhite">
                        <label>{t('filter_price')} ($)</label>
                        <div className="rangeLabelsGreen">
                            <span>{priceRange[0].toLocaleString()}</span> — <span>{priceRange[1].toLocaleString()}</span>
                        </div>
                        <div className="rangeSliderUI">
                            <input type="range" min="0" max="100000" step="1000" value={priceRange[0]} onChange={(e) => handleDualRange(e, 0, priceRange, setPriceRange)} className="dualInput" />
                            <input type="range" min="0" max="100000" step="1000" value={priceRange[1]} onChange={(e) => handleDualRange(e, 1, priceRange, setPriceRange)} className="dualInput" />
                            <div className="trackGreen"></div>
                        </div>
                    </div>

                    <div className="filterBlockWhite">
                        <label>{t('filter_year')}</label>
                        <div className="rangeLabelsGreen">
                            <span>{yearRange[0]}</span> — <span>{yearRange[1]}</span>
                        </div>
                        <div className="rangeSliderUI">
                            <input type="range" min="2010" max="2025" step="1" value={yearRange[0]} onChange={(e) => handleDualRange(e, 0, yearRange, setYearRange)} className="dualInput" />
                            <input type="range" min="2010" max="2025" step="1" value={yearRange[1]} onChange={(e) => handleDualRange(e, 1, yearRange, setYearRange)} className="dualInput" />
                            <div className="trackGreen"></div>
                        </div>
                    </div>

                    <div className="filterBlockWhite">
                        <label>{t('filter_mileage')} (km)</label>
                        <div className="rangeLabelsGreen">
                            <span>{mileageRange[0].toLocaleString()}</span> — <span>{mileageRange[1].toLocaleString()}</span>
                        </div>
                        <div className="rangeSliderUI">
                            <input type="range" min="0" max="300000" step="5000" value={mileageRange[0]} onChange={(e) => handleDualRange(e, 0, mileageRange, setMileageRange)} className="dualInput" />
                            <input type="range" min="0" max="300000" step="5000" value={mileageRange[1]} onChange={(e) => handleDualRange(e, 1, mileageRange, setMileageRange)} className="dualInput" />
                            <div className="trackGreen"></div>
                        </div>
                    </div>

                    <div className="filterBlockWhite">
                        <label>{t('filter_fuel')}</label>
                        <div className="fuelGrid">
                            {['Все', 'Бензин', 'Электро', 'Гибрид'].map(type => (
                                <button key={type} className={`fuelBtn ${fuelType === type ? 'active' : ''}`} onClick={() => setFuelType(type)}>{type}</button>
                            ))}
                        </div>
                    </div>

                    <div className="filterBlockWhite">
                        <label>{t('filter_transmission')}</label>
                        <div className="toggleGroup">
                            {['Все', 'Автомат', 'Механика'].map(t => (
                                <button key={t} className={transmission === t ? 'active' : ''} onClick={() => setTransmission(t)}>{t}</button>
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
                            <button className="backToListBtn" onClick={() => {
                                setSelectedCar(null);
                                setCurrentMainImage(null);
                            }}>
                                ← {t('btn_back')}
                            </button>

                            <div className="detailContent">
                                <div className="gallerySection">
                                    <div className="mainPhotoBox">
                                        <img
                                            src={currentMainImage || selectedCar.image}
                                            alt="Main"
                                            className="detailImageMain"
                                        />
                                    </div>
                                    <div className="thumbnailsGrid">
                                        {/* Используем useMemo или просто фильтруем, чтобы не было дубликатов */}
                                        {Array.from(new Set([selectedCar.image, ...(selectedCar.images || [])])).map((img, index) => {
                                            // Проверяем активность: либо это выбранная картинка, 
                                            // либо если ничего не выбрано, то подсвечиваем самую первую (индекс 0)
                                            const isActive = currentMainImage === img || (!currentMainImage && img === selectedCar.image);

                                            return (
                                                <div
                                                    key={`${selectedCar.id}-thumb-${index}`}
                                                    className={`thumbItem ${isActive ? 'activeThumb' : ''}`}
                                                    onClick={() => setCurrentMainImage(img)}
                                                >
                                                    <img src={img} alt={`thumb-${index}`} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="detailHeader">
                                    <h1>{selectedCar.title}</h1>
                                    <div className="detailPriceLarge">${selectedCar.price.toLocaleString()}</div>
                                </div>

                                <div className="detailMainGrid">
                                    <div className="specsCard">
                                        <h3>{t('specs_title')}</h3>
                                        <div className="specsList">
                                            <div className="specRow"><span>{t('spec_year')}</span> <b>{selectedCar.year}</b></div>
                                            <div className="specRow"><span>{t('spec_mileage')}</span> <b>{selectedCar.mileage?.toLocaleString()} {t('unit_km')}</b></div>
                                            <div className="specRow"><span>{t('spec_fuel')}</span> <b>{t(selectedCar.fuel?.toLowerCase()) || selectedCar.fuel}</b></div>
                                            <div className="specRow"><span>{t('spec_trans')}</span> <b>{t(selectedCar.transmission?.toLowerCase()) || selectedCar.transmission}</b></div>
                                            <div className="specRow"><span>{t('spec_brand')}</span> <b>{selectedCar.brand}</b></div>
                                        </div>
                                    </div>

                                    <div className="specsCard">
                                        <h3>{t('options_title')}</h3>
                                        <div className="optionsGrid">
                                            {selectedCar.specs?.map((opt, i) => (
                                                <div key={i} className="optionTag">✓ {opt}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="descriptionBox">
                                    <h3>{t('desc_title')}</h3>
                                    <p>{selectedCar.description}</p>
                                </div>

                                <div className="detailActions">
                                    <button className="orderMainBtn">{t('btn_book')}</button>
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
                                            onDelete={() => handleDeleteCar(car)} />
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
                                            onClick={() => {
                                                setCurrentPage(i + 1);
                                                scrollToContent();
                                            }}
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