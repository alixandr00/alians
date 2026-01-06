import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { IoCarOutline, IoChevronDownOutline } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';
import './QuickSearchSection.css';
import SecondCarImage from '../../assets/SOK6363-762x456.jpg';
import { useTranslation } from 'react-i18next';
import { BRANDS_MODELS } from '../../data/CarsData';

export const QuickSearchSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [priceRange, setPriceRange] = useState(null);

    // Подготовка данных
    const brandOptions = useMemo(() => {
        return Object.keys(BRANDS_MODELS).sort().map(brand => ({ value: brand, label: brand }));
    }, []);

    const availableModels = useMemo(() => {
        if (!selectedBrand) return [];
        return BRANDS_MODELS[selectedBrand.value].map(model => ({ value: model, label: model }));
    }, [selectedBrand]);

    const priceOptions = [
        { value: "0-20000", label: t('price_up_to_20k') || "до $20 000" },
        { value: "20000-50000", label: "$20 000 - $50 000" },
        { value: "50000-100000", label: "$50 000 - $100 000" },
        { value: "100000-200000", label: "$100 000 - $200 000" },
        { value: "200000-300000", label: "$200 000 - $300 000" },
        { value: "300000-9999999", label: t('price_from_300k') || "от $300 000" }
    ];

    // Настройки стилей для библиотеки, чтобы они не конфликтовали с твоим CSS
    const selectStyles = {
        control: (base) => ({
            ...base,
            border: 0,
            boxShadow: 'none',
            background: 'transparent',
            minHeight: 'auto',
        }),
        valueContainer: (base) => ({ ...base, padding: 0 }),
        input: (base) => ({ ...base, margin: 0, padding: 0 }),
        indicatorSeparator: () => ({ display: 'none' }),
        dropdownIndicator: () => ({ display: 'none' }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            borderRadius: '10px',
            marginTop: '10px'
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#387b64' : state.isFocused ? '#e8f3ee' : '#fff',
            color: state.isSelected ? '#fff' : '#2d3436',
            '&:active': { backgroundColor: '#387b64' }
        })
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // По умолчанию ставим большой диапазон, чтобы в него входили все авто
        let min = 0, max = 10000000;

        if (priceRange) {
            const parts = priceRange.value.split('-');
            min = parts[0];
            max = parts[1];
        }

        const query = new URLSearchParams({
            brand: selectedBrand?.value || '',
            model: selectedModel?.value || '',
            minPrice: min,
            maxPrice: max
        }).toString();

        navigate(`/catalog?${query}`);
    };

    return (
        <section className="quickSearchSection">
            <div className="searchContainer">
                <h2 className="sectionTitle">{t('quick_search_title')}</h2>
                <form className="searchForm" onSubmit={handleSearch}>
                    <div className="formRow topRowInputs">

                        <div className="inputGroup">
                            <IoCarOutline className="inputIcon" />
                            <Select
                                className="selectField"
                                styles={selectStyles}
                                options={brandOptions}
                                value={selectedBrand}
                                onChange={(opt) => { setSelectedBrand(opt); setSelectedModel(null); }}
                                placeholder={t('placeholder_brandd')}
                                menuPlacement="bottom" // ГАРАНТИРУЕТ ОТКРЫТИЕ ВНИЗ
                            />
                            <IoChevronDownOutline className="chevronIcon" />
                        </div>

                        <div className="inputGroup">
                            <IoCarOutline className="inputIcon" />
                            <Select
                                className="selectField"
                                styles={selectStyles}
                                options={availableModels}
                                value={selectedModel}
                                onChange={(opt) => setSelectedModel(opt)}
                                isDisabled={!selectedBrand}
                                placeholder={t('placeholder_brand_model')}
                                menuPlacement="bottom"
                            />
                            <IoChevronDownOutline className="chevronIcon" />
                        </div>

                        <div className="inputGroup">
                            <FaDollarSign className="dollarSign" />
                            <Select
                                className="selectField"
                                styles={selectStyles}
                                options={priceOptions}
                                value={priceRange}
                                onChange={(opt) => setPriceRange(opt)}
                                placeholder={t('placeholder_price_range')}
                                menuPlacement="bottom"
                            />
                            <IoChevronDownOutline className="chevronIcon" />
                        </div>
                    </div>

                    <div className="formRow bottomRowFilters">
                        <button type="submit" className="buttonShowCar">
                            {t('btn_show_cars')}
                        </button>

                        <div className="filterTags">
                            {selectedBrand && (
                                <div className="filterTag activeTag" onClick={() => { setSelectedBrand(null); setSelectedModel(null); }}>
                                    <IoCarOutline className="tagIcon" />
                                    <span>{selectedBrand.label}</span>
                                    <span className="removeTag">×</span>
                                </div>
                            )}
                            {selectedModel && (
                                <div className="filterTag activeTag" onClick={() => setSelectedModel(null)}>
                                    {/* <IoSettingsOutline className="tagIcon" /> */}
                                    <span>{selectedModel.label}</span>
                                    <span className="removeTag">×</span>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
                <div className="searchBackground" style={{ backgroundImage: `url(${SecondCarImage})` }}></div>
            </div>
        </section>
    );
};