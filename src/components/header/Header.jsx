import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import { useTranslation } from 'react-i18next';
// Импортируем компонент флага
import Flag from 'react-world-flags';
import {
    IoSearchOutline,
    IoCheckmarkCircle,
    IoMenuOutline,
    IoCloseOutline,
    IoChevronDownOutline
} from 'react-icons/io5';

export const Header = ({ searchTerm, setSearchTerm }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // Состояния
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    // Рефы для клика вне элементов
    const langRef = useRef(null);

    // Список доступных языков
    const languages = [
        { code: 'ru', label: 'Русский', country: 'RUS' },
        { code: 'zh', label: '中文', country: 'CHN' },
        { code: 'en', label: 'English', country: 'USA' },
        { code: 'ko', label: '한국어', country: 'KOR' },
        { code: 'ka', label: 'ქართული', country: 'GEO' },
        { code: 'ar', label: 'العربية', country: 'ARE' }
    ];

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    // Закрытие селекта языка при клике в любое другое место
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Логика живого поиска
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm || searchTerm.length < 1) {
                setSuggestions([]);
                return;
            }

            const { data, error } = await supabase
                .from('car-cards')
                .select('id, title, image, price')
                .ilike('title', `%${searchTerm}%`)
                .limit(5);

            if (!error && data) {
                setSuggestions(data);
            }
        };

        const timer = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSelectCar = (carId) => {
        setSuggestions([]);
        setSearchTerm('');
        navigate('/catalog', { state: { selectedCarId: carId } });
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="headerContainer">
            {/* Кнопка мобильного меню */}
            <div className="burgerButton" onClick={toggleMenu}>
                {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </div>

            {/* Логотип */}
            <div className="logoBlock" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <span className="logoIcon">{'<'}</span>
                <span className="logoText">Alians</span>
            </div>

            {/* Навигация */}
            <div className={`navWrapper ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobileMenuHeader">
                    <span className="logoText">{t('menu')}</span>
                    <IoCloseOutline className="closeMenuIcon" onClick={toggleMenu} />
                </div>

                <nav className="navMenu">
                    <NavLink to="/" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_home')}</NavLink>
                    <NavLink to="/catalog" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_catalog')}</NavLink>
                    <NavLink to="/contacts" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_contacts')}</NavLink>
                    <NavLink to="/faq" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_faq')}</NavLink>
                    <NavLink to="/calculator" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_calc')}</NavLink>
                    <NavLink to="/auth" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_login')}</NavLink>
                </nav>
                <div className="customLangWrapper" ref={langRef}>
                    <div
                        className={`langSelectBtn ${isLangOpen ? 'active' : ''}`}
                        onClick={() => setIsLangOpen(!isLangOpen)}
                    >
                        <Flag code={currentLanguage.country} className="selectedFlagImg" />
                        <span className="selectedText">{currentLanguage.code.toUpperCase()}</span>
                        <IoChevronDownOutline className={`arrowIcon ${isLangOpen ? 'rotate' : ''}`} />
                    </div>

                    {isLangOpen && (
                        <div className="langDropdownList">
                            {languages.map((lang) => (
                                <div
                                    key={lang.code}
                                    className={`langOptionItem ${i18n.language === lang.code ? 'current' : ''}`}
                                    onClick={() => changeLanguage(lang.code)}
                                >
                                    <div className="langOptionContent">
                                        <Flag code={lang.country} className="optionFlagImg" />
                                        <span className="optionLabelText">{lang.label}</span>
                                    </div>
                                    <span className="langCodeShort">{lang.code.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="contactSearchBlock">

                    <div className="searchWrapper">
                        <IoSearchOutline className="headerIcon searchIcon" />
                        <input
                            type="text"
                            className="phoneNumberInput"
                            placeholder={t('search_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {suggestions.length > 0 && (
                            <div className="searchResultsDropdown">
                                {suggestions.map((car) => (
                                    <div
                                        key={car.id}
                                        className="searchResultCard"
                                        onClick={() => handleSelectCar(car.id)}
                                    >
                                        <img src={car.image} alt={car.title} />
                                        <div className="resultInfo">
                                            <span className="resultTitle">{car.title}</span>
                                            <span className="resultPrice">${car.price?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </header>
    );
};