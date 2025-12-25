import React from 'react';
import { IoCarOutline, IoSettingsOutline, IoLocationOutline, IoChevronDownOutline } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';
import './QuickSearchSection.css';
import SecondCarImage from '../../assets/SOK6363-762x456.jpg';
import { useTranslation } from 'react-i18next';

export const QuickSearchSection = () => {
    const { t } = useTranslation();

    return (
        <section className="quickSearchSection">
            <div className="searchContainer">
                <h2 className="sectionTitle">{t('quick_search_title')}</h2>
                <form className="searchForm" onSubmit={(e) => e.preventDefault()}>

                    <div className="formRow topRowInputs">
                        {/* Селект: Марка */}
                        <div className="inputGroup">
                            <IoCarOutline className="inputIcon" />
                            <select className="selectField">
                                <option value="" disabled selected>{t('placeholder_brandd')}</option>
                                <option value="audi">Audi</option>
                                <option value="bmw">BMW</option>
                            </select>
                            <IoChevronDownOutline className="chevronIcon" />
                        </div>

                        {/* Селект: Модель */}
                        <div className="inputGroup">
                            <IoCarOutline className="inputIcon" />
                            <select className="selectField">
                                <option value="" disabled selected>{t('placeholder_brand_model')}</option>
                                <option value="a4">A4</option>
                                <option value="q7">Q7</option>
                            </select>
                            <IoChevronDownOutline className="chevronIcon" />
                        </div>

                        {/* Селект: Цена */}
                        <div className="inputGroup">
                            <FaDollarSign className="dollarSign" />
                            <select className="selectField">
                                <option value="" disabled selected>{t('placeholder_price_range')}</option>
                                <option value="10-20">10 000 - 20 000</option>
                                <option value="20-30">20 000 - 30 000</option>
                            </select>
                            <IoChevronDownOutline className="chevronIcon" />
                        </div>
                    </div>

                    <div className="formRow bottomRowFilters">
                        <button type="submit" className="buttonShowCar">
                            {t('btn_show_cars')}
                        </button>

                        <div className="filterTags">
                            <div className="filterTag activeTag">
                                <IoCarOutline className="tagIcon" />
                                <span>Audi</span>
                                <span className="dropdownArrow">▼</span>
                            </div>

                            <div className="filterTag">
                                <IoSettingsOutline className="tagIcon" />
                                <span>{t('автомат')}</span>
                            </div>

                            <div className="filterTag">
                                <IoLocationOutline className="tagIcon" />
                                <span>23 000 {t('unit_km')}</span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="searchBackground" style={{ backgroundImage: `url(${SecondCarImage})` }}>
                </div>
            </div>
        </section>
    );
};