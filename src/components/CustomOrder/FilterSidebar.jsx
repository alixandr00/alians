import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { row1Brands, row2Brands } from '../../data/CarsData';
import { IoChevronDownOutline } from 'react-icons/io5';

export const FilterSidebar = ({
    selectedBrands, toggleBrand,
    isPickerOpen, setIsPickerOpen, pickerRef,
    groupedModels, selectedModels, toggleModel, setSelectedModels,
    priceRange, setPriceRange,
    yearRange, setYearRange,
    fuelType, setFuelType,
    selectedColors,
    toggleColor,
    handleApplyFilters, resetFilters,
    transmission, setTransmission
}) => {
    const { t } = useTranslation();
    const [isColorOpen, setIsColorOpen] = useState(false);
    const colorRef = useRef(null);

    const availableColors = [
        { id: 'white', hex: '#FFFFFF', name: t('color_white') || 'Белый' },
        { id: 'black', hex: '#000000', name: t('color_black') || 'Черный' },
        { id: 'silver', hex: '#C0C0C0', name: t('color_silver') || 'Серебристый' },
        { id: 'gray', hex: '#808080', name: t('color_gray') || 'Серый' },
        { id: 'blue', hex: '#2196F3', name: t('color_blue') || 'Синий' },
        { id: 'darkblue', hex: '#00008B', name: t('color_darkblue') || 'Темно-синий' },
        { id: 'red', hex: '#F44336', name: t('color_red') || 'Красный' },
        { id: 'burgundy', hex: '#800020', name: t('color_burgundy') || 'Бордовый' },
        { id: 'green', hex: '#4CAF50', name: t('color_green') || 'Зеленый' },
        { id: 'brown', hex: '#A52A2A', name: t('color_brown') || 'Коричневый' },
        { id: 'beige', hex: '#F5F5DC', name: t('color_beige') || 'Бежевый' },
        { id: 'gold', hex: '#FFD700', name: t('color_gold') || 'Золотистый' },
    ];

    // Логика текста в кнопке
    const getButtonText = () => {
        if (!selectedColors || selectedColors.length === 0) {
            return t('select_color_placeholder') || 'Выберите цвет';
        }
        if (selectedColors.length === 1) {
            const color = availableColors.find(c => c.id === selectedColors[0]);
            return color ? color.name : '';
        }
        // Если выбрано больше одного
        return `${t('filter_selected') || 'Выбрано'}: ${selectedColors.length}`;
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (colorRef.current && !colorRef.current.contains(e.target)) setIsColorOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <aside className="filterSidebar">
            <h3 className="filterMainTitle">{t('filter_title')}</h3>

            {/* Бренды Ряд 1 */}
            <div className="brandSwipeRow">
                {row1Brands.map(brand => (
                    <div key={brand.name}
                        className={`brandIconCard ${selectedBrands.includes(brand.name) ? 'active' : ''}`}
                        onClick={() => toggleBrand(brand.name)}>
                        <img src={brand.icon} alt={brand.name} />
                        <span>{brand.name}</span>
                    </div>
                ))}
            </div>

            {/* Бренды Ряд 2 */}
            <div className="brandSwipeRow">
                {row2Brands.map(brand => (
                    <div key={brand.name}
                        className={`brandIconCard ${selectedBrands.includes(brand.name) ? 'active' : ''}`}
                        onClick={() => toggleBrand(brand.name)}>
                        <img src={brand.icon} alt={brand.name} />
                        <span>{brand.name}</span>
                    </div>
                ))}
            </div>

            {/* Выбор моделей */}
            {isPickerOpen && selectedBrands.length > 0 && (
                <div className="modelsFloatingPicker" ref={pickerRef}>
                    <div className="pickerHeader">
                        <span>{t('filter_models_title')}</span>
                        <div className="pickerActions">
                            <button className="applyModelsBtn" onClick={() => setIsPickerOpen(false)}>{t('btn_apply')}</button>
                            <button className="clearModelsBtn" onClick={() => setSelectedModels([])}>{t('btn_reset')}</button>
                        </div>
                    </div>
                    <div className="groupedModelsContainer">
                        {groupedModels.map(group => (
                            <div key={group.brandName} className="brandModelGroup">
                                <h4 className="groupBrandTitle">{group.brandName}</h4>
                                <div className="modelsGridMini">
                                    {group.models.map(model => (
                                        <button key={model}
                                            className={`modelChip ${selectedModels.includes(model) ? 'active' : ''}`}
                                            onClick={() => toggleModel(model)}>
                                            {model}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Цена */}
            <div className="filterBlockWhite">
                <label>{t('filter_price')} ($)</label>
                <div className="rangeLabelsGreen">
                    <span>{priceRange[0].toLocaleString()}</span> — <span>{priceRange[1].toLocaleString()}</span>
                </div>
                <div className="rangeSliderUI">
                    <input type="range" min="0" max="300000" step="1000" value={priceRange[0]}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v <= priceRange[1]) setPriceRange([v, priceRange[1]]);
                        }} className="dualInput" />
                    <input type="range" min="0" max="300000" step="1000" value={priceRange[1]}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v >= priceRange[0]) setPriceRange([priceRange[0], v]);
                        }} className="dualInput" />
                    <div className="trackGreen"></div>
                </div>
            </div>

            {/* Год */}
            <div className="filterBlockWhite">
                <label>{t('filter_year')}</label>
                <div className="rangeLabelsGreen">
                    <span>{yearRange[0]}</span> — <span>{yearRange[1]}</span>
                </div>
                <div className="rangeSliderUI">
                    <input type="range" min="2020" max="2026" step="1" value={yearRange[0]}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v <= yearRange[1]) setYearRange([v, yearRange[1]]);
                        }} className="dualInput" />
                    <input type="range" min="2020" max="2026" step="1" value={yearRange[1]}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v >= yearRange[0]) setYearRange([yearRange[0], v]);
                        }} className="dualInput" />
                    <div className="trackGreen"></div>
                </div>
            </div>

            <div className="filterBlockWhite">
                <label>{t('filter_color') || 'Цвет кузова'}</label>
                <div className="customColorSelect" ref={colorRef}>
                    <div
                        className={`colorSelectBtn ${isColorOpen ? 'active' : ''}`}
                        onClick={() => setIsColorOpen(!isColorOpen)}
                    >
                        <div className="selectedColorsPreview">
                            {/* Показываем кружок только если выбран ровно 1 цвет */}
                            {selectedColors.length === 1 && (
                                <div
                                    className="miniColorCircle"
                                    style={{
                                        backgroundColor: availableColors.find(c => c.id === selectedColors[0])?.hex,
                                        border: selectedColors[0] === 'white' ? '1px solid #ccc' : 'none',
                                        marginRight: '8px'
                                    }}
                                />
                            )}
                            <span className="selectedTextName">{getButtonText()}</span>
                        </div>
                        <IoChevronDownOutline className={`arrowIcon ${isColorOpen ? 'rotate' : ''}`} />
                    </div>

                    {isColorOpen && (
                        <div className="colorDropdownList">
                            {availableColors.map(color => {
                                const isSelected = selectedColors.includes(color.id);
                                return (
                                    <div
                                        key={color.id}
                                        className={`colorOption ${isSelected ? 'selected' : ''}`}
                                        onClick={() => toggleColor(color.id)}
                                    >
                                        <div className="optionColorRow">
                                            <div
                                                className="colorCircleSmall"
                                                style={{
                                                    backgroundColor: color.hex,
                                                    border: color.id === 'white' ? '1px solid #ddd' : 'none'
                                                }}
                                            />
                                            <span>{color.name}</span>
                                        </div>
                                        <div className={`multiCheck ${isSelected ? 'checked' : ''}`}>
                                            {isSelected && '✓'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Топливо */}
            <div className="filterBlockWhite">
                <label>{t('filter_fuel')}</label>
                <div className="fuelGrid">
                    {[
                        { id: 'Все', label: t('fuel_all') },
                        { id: 'Бензин', label: t('fuel_petrol') },
                        { id: 'Электро', label: t('fuel_electric') },
                        { id: 'Гибрид', label: t('fuel_hybrid') }
                    ].map(type => (
                        <button
                            key={type.id}
                            className={`fuelBtn ${fuelType === type.id ? 'active' : ''}`}
                            onClick={() => setFuelType(type.id)}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Коробка передач (Трансмиссия) */}
            <div className="filterBlockWhite">
                <label>{t('filter_transmission') || 'Коробка передач'}</label>
                <div className="fuelGrid">
                    {[
                        { id: 'Все', label: t('trans_all') || 'Все' },
                        { id: 'Автомат', label: t('trans_automatic') || 'Автомат' },
                        { id: 'Робот', label: t('trans_robot') || 'Робот' },
                        { id: 'Вариатор', label: t('trans_cvt') || 'Вариатор' }
                    ].map(type => (
                        <button
                            key={type.id}
                            className={`fuelBtn ${transmission === type.id ? 'active' : ''}`}
                            onClick={() => setTransmission(type.id)}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filterFooterRow">
                <button className="mainApplyBtn" onClick={handleApplyFilters}>{t('btn_show')}</button>
                <button className="resetBtnSimple" onClick={resetFilters}>{t('btn_reset')}</button>
            </div>
        </aside>
    );
};