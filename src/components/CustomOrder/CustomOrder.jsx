import React, { useState, useMemo, useRef } from 'react';
import { carsData } from '../../data/CarsData';
import { CarCard } from '../AutoFromChina/CarCard';
import './CustomOrder.css';

const row1Brands = [
    { name: 'Audi', icon: 'https://www.carlogos.org/car-logos/audi-logo.png' },
    { name: 'BMW', icon: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
    { name: 'BYD', icon: 'https://www.carlogos.org/car-logos/byd-logo.png' },
    { name: 'Tesla', icon: 'https://www.carlogos.org/car-logos/tesla-logo.png' },
    { name: 'Mercedes', icon: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
    { name: 'Mazda', icon: 'https://www.carlogos.org/car-logos/mazda-logo.png' },
    { name: 'Chevrolet', icon: 'https://www.carlogos.org/car-logos/chevrolet-logo.png' }
];

const row2Brands = [
    { name: 'JAC', icon: 'https://www.carlogos.org/car-logos/jac-motors-logo.png' },
    { name: 'Subaru', icon: 'https://www.carlogos.org/car-logos/subaru-logo.png' },
    { name: 'Geely', icon: 'https://www.carlogos.org/car-logos/geely-logo.png' },
    { name: 'Chery', icon: 'https://www.carlogos.org/car-logos/chery-logo.png' },
    { name: 'Zeekr', icon: 'https://www.carlogos.org/car-logos/zeekr-logo.png' },
    { name: 'Lada', icon: 'https://www.carlogos.org/car-logos/lada-logo.png' },
    { name: 'Hyundai', icon: 'https://www.carlogos.org/car-logos/hyundai-logo.png' }
];

export const CustomOrder = () => {
    const catalogContentRef = useRef(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [yearRange, setYearRange] = useState([2010, 2025]);
    const [mileageRange, setMileageRange] = useState([0, 300000]);
    const [transmission, setTransmission] = useState('Все');
    const [fuelType, setFuelType] = useState('Все');
    const [currentMainImage, setCurrentMainImage] = useState(null);



    // Новое состояние для выбранной машины
    const [selectedCar, setSelectedCar] = useState(null);

    const [appliedFilters, setAppliedFilters] = useState({
        brands: [],
        price: [0, 100000],
        year: [2010, 2025],
        mileage: [0, 300000],
        transmission: 'Все',
        fuel: 'Все'
    });

    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;

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
        setSelectedCar(null); // Закрываем детали при поиске
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

    const filteredCars = useMemo(() => {
        return carsData.filter(car => {
            const matchBrand = appliedFilters.brands.length === 0 || appliedFilters.brands.includes(car.brand);
            const matchPrice = car.price >= appliedFilters.price[0] && car.price <= appliedFilters.price[1];
            const matchYear = car.year >= appliedFilters.year[0] && car.year <= appliedFilters.year[1];
            const matchMileage = car.mileage >= appliedFilters.mileage[0] && car.mileage <= appliedFilters.mileage[1];
            const matchTrans = appliedFilters.transmission === 'Все' || car.transmission === appliedFilters.transmission;
            const matchFuel = appliedFilters.fuel === 'Все' || car.fuel === appliedFilters.fuel;
            return matchBrand && matchPrice && matchYear && matchMileage && matchTrans && matchFuel;
        });
    }, [appliedFilters]);

    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    const currentCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

    const scrollToContent = () => {
        if (catalogContentRef.current) {
            const yOffset = -80;
            const element = catalogContentRef.current;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="catalogPage">
            <div className="catalogContainer">
                <aside className="filterSidebar">
                    <h3 className="filterMainTitle">Фильтр</h3>

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
                        <label>Цена ($)</label>
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
                        <label>Год выпуска</label>
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
                        <label>Пробег (км)</label>
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
                        <label>Тип топлива</label>
                        <div className="fuelGrid">
                            {['Все', 'Бензин', 'Электро', 'Гибрид'].map(type => (
                                <button key={type} className={`fuelBtn ${fuelType === type ? 'active' : ''}`} onClick={() => setFuelType(type)}>{type}</button>
                            ))}
                        </div>
                    </div>

                    <div className="filterBlockWhite">
                        <label>КПП</label>
                        <div className="toggleGroup">
                            {['Все', 'Автомат', 'Механика'].map(t => (
                                <button key={t} className={transmission === t ? 'active' : ''} onClick={() => setTransmission(t)}>{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="filterFooterRow">
                        <button className="mainApplyBtn" onClick={handleApplyFilters}>Показать</button>
                        <button className="resetBtnSimple" onClick={resetFilters}>Сбросить</button>
                    </div>
                </aside>

                <main className="catalogContent" ref={catalogContentRef}>
                    {/* ЛОГИКА ПЕРЕКЛЮЧЕНИЯ: Список или Детали */}
                    {selectedCar ? (
                        <div className="carDetailContainer" >
                            <button className="backToListBtn" onClick={() => {
                                setSelectedCar(null);
                                setCurrentMainImage(null);
                            }}>
                                ← Назад к списку
                            </button>

                            <div className="detailContent">
                                {/* ГАЛЕРЕЯ */}
                                <div className="gallerySection">
                                    <div className="mainPhotoBox">
                                        <img
                                            src={currentMainImage || selectedCar.image}
                                            alt="Main"
                                            className="detailImageMain"
                                        />
                                    </div>
                                    <div className="thumbnailsGrid">
                                        {[selectedCar.image, ...(selectedCar.images || [])].map((img, index) => (
                                            <div
                                                key={index}
                                                className={`thumbItem ${(currentMainImage === img || (!currentMainImage && index === 0)) ? 'activeThumb' : ''}`}
                                                onClick={() => setCurrentMainImage(img)}
                                            >
                                                <img src={img} alt={`thumb-${index}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ОСНОВНАЯ ИНФО */}
                                <div className="detailHeader">
                                    <h1>{selectedCar.title}</h1>
                                    <div className="detailPriceLarge">${selectedCar.price.toLocaleString()}</div>
                                </div>

                                <div className="detailMainGrid">
                                    {/* ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ */}
                                    <div className="specsCard">
                                        <h3>Технические характеристики</h3>
                                        <div className="specsList">
                                            <div className="specRow"><span>Год выпуска</span> <b>{selectedCar.year}</b></div>
                                            <div className="specRow"><span>Пробег</span> <b>{selectedCar.mileage.toLocaleString()} км</b></div>
                                            <div className="specRow"><span>Тип топлива</span> <b>{selectedCar.fuel}</b></div>
                                            <div className="specRow"><span>Коробка</span> <b>{selectedCar.transmission}</b></div>
                                            <div className="specRow"><span>Марка</span> <b>{selectedCar.brand}</b></div>
                                        </div>
                                    </div>

                                    {/* КОМПЛЕКТАЦИЯ */}
                                    <div className="specsCard">
                                        <h3>Особенности и опции</h3>
                                        <div className="optionsGrid">
                                            {selectedCar.specs?.map((opt, i) => (
                                                <div key={i} className="optionTag">✓ {opt}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* ОПИСАНИЕ */}
                                <div className="descriptionBox">
                                    <h3>Описание от продавца</h3>
                                    <p>{selectedCar.description}</p>
                                </div>

                                <div className="detailActions">
                                    <button className="orderMainBtn">Забронировать автомобиль</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="resultsHeader">Найдено авто: <span>{filteredCars.length}</span></div>
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
                                                // catalogContentRef.current?.scrollIntoView({
                                                //     behavior: 'smooth',
                                                //     block: 'start'
                                                // });
                                            }}
                                        />
                                    ))
                                ) : (
                                    <div className="noResults">К сожалению, таких авто нет</div>
                                )}
                            </div>

                            {totalPages > 1 && (
                                <div className="pagination" >
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`pageBtn ${currentPage === i + 1 ? 'active' : ''}`}
                                            onClick={() => {
                                                setCurrentPage(i + 1);
                                                scrollToContent();
                                                // catalogContentRef.current?.scrollIntoView({
                                                //     behavior: 'smooth',
                                                //     block: 'start'
                                                // });
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