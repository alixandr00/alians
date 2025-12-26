import React from 'react';
import { useTranslation } from 'react-i18next';
import { row1Brands, row2Brands } from '../../data/CarsData';

export const FilterSidebar = ({
    selectedBrands, toggleBrand,
    isPickerOpen, setIsPickerOpen, pickerRef,
    groupedModels, selectedModels, toggleModel, setSelectedModels,
    priceRange, setPriceRange,
    yearRange, setYearRange,
    fuelType, setFuelType,
    selectedColors, toggleColor,
    handleApplyFilters, resetFilters
}) => {
    const { t } = useTranslation();

    const availableColors = [
        { id: 'white', hex: '#FFFFFF', name: 'Белый' },
        { id: 'black', hex: '#000000', name: 'Черный' },
        { id: 'silver', hex: '#C0C0C0', name: 'Серебристый' },
        { id: 'blue', hex: '#2196F3', name: 'Синий' },
        { id: 'red', hex: '#F44336', name: 'Красный' },
        { id: 'green', hex: '#4CAF50', name: 'Зеленый' },
    ];

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
                            <button className="applyModelsBtn" onClick={() => setIsPickerOpen(false)}>Применить</button>
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
                    <input type="range" min="0" max="100000" step="1000" value={priceRange[0]}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v <= priceRange[1]) setPriceRange([v, priceRange[1]]);
                        }} className="dualInput" />
                    <input type="range" min="0" max="100000" step="1000" value={priceRange[1]}
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
                    <input type="range" min="2010" max="2025" step="1" value={yearRange[0]}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v <= yearRange[1]) setYearRange([v, yearRange[1]]);
                        }} className="dualInput" />
                    <input type="range" min="2010" max="2025" step="1" value={yearRange[1]}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            if (v >= yearRange[0]) setYearRange([yearRange[0], v]);
                        }} className="dualInput" />
                    <div className="trackGreen"></div>
                </div>
            </div>

            {/* ЦВЕТ (НОВЫЙ БЛОК) */}
            <div className="filterBlockWhite">
                <label>{t('filter_color') || 'Цвет кузова'}</label>
                <div className="colorGrid">
                    {/* Кнопка сброса всех цветов */}
                    <button
                        className={`colorCircle allColors ${selectedColors.length === 0 ? 'active' : ''}`}
                        onClick={() => resetFilters()} // Или создай отдельную очистку цветов
                        title="Все цвета"
                    >
                        ✕
                    </button>

                    {availableColors.map(color => (
                        <button
                            key={color.id}
                            className={`colorCircle ${selectedColors.includes(color.id) ? 'active' : ''}`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => toggleColor(color.id)}
                            title={color.name}
                        >
                        </button>
                    ))}
                </div>
            </div>

            {/* Топливо */}
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
    );
};