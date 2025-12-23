import React from 'react';
import { IoCarOutline, IoSettingsOutline, IoLocationOutline } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';
import './QuickSearchSection.css';
import SecondCarImage from '../../assets/SOK6363-762x456.jpg';
import { useTranslation } from 'react-i18next'; // Импорт

export const QuickSearchSection = () => {
    const { t } = useTranslation(); // Инициализация

    return (
        <section className="quickSearchSection">
            <div className="searchContainer">
                <h2 className="sectionTitle">{t('quick_search_title')}</h2>
                <form className="searchForm" onSubmit={(e) => e.preventDefault()}>

                    <div className="formRow topRowInputs">
                        {/* Поле 1: Марка/Модель */}
                        <div className="inputGroup searchModel">
                            <IoCarOutline className="inputIcon" />
                            <input
                                type="text"
                                placeholder={t('placeholder_brand_model')}
                                className="inputField"
                            />
                        </div>

                        {/* Поле 2: Диапазон Цены */}
                        <div className="inputGroup priceRange">
                            <FaDollarSign className="dollarSign" />
                            <input
                                type="text"
                                placeholder={t('placeholder_price_range')}
                                className="inputField"
                            />
                        </div>
                    </div>

                    <div className="formRow bottomRowFilters">
                        {/* Кнопка "Показать авто" */}
                        <button type="submit" className="buttonShowCar">
                            {t('btn_show_cars')}
                        </button>

                        <div className="filterTags">
                            {/* Тег Марка */}
                            <div className="filterTag activeTag">
                                <IoCarOutline className="tagIcon" />
                                <span>Audi</span>
                                <span className="dropdownArrow">▼</span>
                            </div>

                            {/* Тег КПП */}
                            <div className="filterTag">
                                <IoSettingsOutline className="tagIcon" />
                                <span>{t('автомат')}</span>
                            </div>

                            {/* Тег Пробег */}
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