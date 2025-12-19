// src/components/Home/QuickSearchSection.jsx
import React from 'react';
// Импортируем иконки (для Audi, Автомата и Пробега)
import { IoCarOutline, IoSettingsOutline, IoLocationOutline } from 'react-icons/io5';
import { FaDollarSign } from 'react-icons/fa';
import './QuickSearchSection.css';
import SecondCarImage from '../../assets/SOK6363-762x456.jpg'; // Ваше изображение

export const QuickSearchSection = () => {
    return (
        <section className="quickSearchSection">

            <div className="searchContainer">

                <h2 className="sectionTitle">Быстрый подбор авто</h2>
                <form className="searchForm">

                    {/* Первый ряд: Поля ввода (занимают всю ширину) */}
                    <div className="formRow topRowInputs">

                        {/* Поле 1: Марка/Модель */}
                        <div className="inputGroup searchModel">
                            <IoCarOutline className="inputIcon" />
                            <input type="text" placeholder="Марка/Модель" className="inputField" />
                        </div>

                        {/* Поле 2: Диапазон Цены */}
                        <div className="inputGroup priceRange">
                            <FaDollarSign className="dollarSign" />
                            <input type="text" placeholder="от 10 000 – до 30 000" className="inputField" />
                        </div>
                    </div>

                    {/* Второй ряд: Кнопка и Фильтры (с отступами) */}
                    <div className="formRow bottomRowFilters">

                        {/* Кнопка "Показать авто" (слева) */}
                        <button type="submit" className="buttonShowCar">
                            Показать авто
                        </button>

                        {/* Фильтры (Теги, выровнены по левому краю) */}
                        <div className="filterTags">
                            {/* Тег Audi */}
                            <div className="filterTag activeTag">
                                <IoCarOutline className="tagIcon" />
                                <span>Audi</span>
                                <span className="dropdownArrow">▼</span>
                            </div>

                            {/* Тег Автомат */}
                            <div className="filterTag">
                                <IoSettingsOutline className="tagIcon" />
                                <span>Автомат</span>
                            </div>

                            {/* Тег Пробег */}
                            <div className="filterTag">
                                <IoLocationOutline className="tagIcon" />
                                <span>23 000 км</span>
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
