import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import {
    IoSearchOutline,
    IoMenuOutline,
    IoCloseOutline,
    IoChevronDownOutline
} from 'react-icons/io5';

export const Header = ({ searchTerm, setSearchTerm, onCountrySelect }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // Состояния
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false); // Новое состояние для стран
    const [suggestions, setSuggestions] = useState([]);

    // Рефы для клика вне элементов
    const langRef = useRef(null);
    const countryRef = useRef(null); // Реф для селекта стран

    const countries = [
        { id: 'china', countryCode: 'CHN' },
        { id: 'korea', countryCode: 'KOR' },
        { id: 'georgia', countryCode: 'GEO' },
        { id: 'dubai', countryCode: 'ARE' },
        { id: 'usa', countryCode: 'USA' }
    ];

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    const languages = [
        { code: 'ru', label: 'Русский', country: 'RUS' },
        { code: 'zh', label: '中文', country: 'CHN' },
        { code: 'en', label: 'English', country: 'USA' },
        { code: 'ko', label: '한국어', country: 'KOR' },
        { code: 'ka', label: 'ქართული', country: 'GEO' },
        { code: 'ar', label: 'العربية', country: 'ARE' }
    ];

    const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

    // Закрытие селектов при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
            if (countryRef.current && !countryRef.current.contains(event.target)) {
                setIsCountryOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Логика поиска (без изменений)
    useEffect(() => {
        const fetchSuggestions = async () => {
            const trimmedSearch = searchTerm.trim();
            if (!trimmedSearch) {
                setSuggestions([]);
                return;
            }
            const { data, error } = await supabase
                .from('car-cards')
                .select('id, title, image, price')
                .ilike('title', `${trimmedSearch}%`)
                .limit(5);

            if (!error && data) setSuggestions(data);
        };
        const timer = setTimeout(() => fetchSuggestions(), 300);
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

    // Функция выбора страны
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsCountryOpen(false);

        if (onCountrySelect) {
            onCountrySelect(country.id);
        }
    };
    return (
        <header className="headerContainer">
            <div className="burgerButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </div>

            <div className="logoBlock" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <span className="logoIcon">{'<'}</span>
                <span className="logoText">Alians</span>
            </div>

            <div className={`navWrapper ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobileMenuHeader">
                    <span className="logoText">{t('menu')}</span>
                    <IoCloseOutline className="closeMenuIcon" onClick={() => setIsMenuOpen(false)} />
                </div>

                <nav className="navMenu">
                    {/* --- НОВЫЙ СЕЛЕКТ СТРАН --- */}
                    <div className="countrySelectWrapper" ref={countryRef}>
                        <div
                            className={`countrySelectBtn ${isCountryOpen ? 'active' : ''}`}
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                        >
                            <span className="navLink activeLink">{t(`countries.${selectedCountry.id}`)}</span>
                            <IoChevronDownOutline className={`arrowIcon ${isCountryOpen ? 'rotate' : ''}`} />
                        </div>

                        {isCountryOpen && (
                            <div className="countryDropdownList">
                                {countries.map((c) => (
                                    <NavLink to='/'
                                        key={c.id}
                                        className={`countryOptionItem ${selectedCountry.id === c.id ? 'current' : ''}`}
                                        onClick={() => handleCountrySelect(c)}
                                    >
                                        <Flag code={c.countryCode} className="optionFlagImg" />
                                        <span>{t(`countries.${c.id}`)}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* ------------------------- */}

                    <NavLink to="/catalog" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_catalog')}</NavLink>
                    <NavLink to="/contacts" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_contacts')}</NavLink>
                    <NavLink to="/faq" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_faq')}</NavLink>
                    <NavLink to="/calculator" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_calc')}</NavLink>
                    <NavLink to="/auth" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_login')}</NavLink>
                </nav>

                {/* Селект языка */}
                <div className="customLangWrapper" ref={langRef}>
                    <div className={`langSelectBtn ${isLangOpen ? 'active' : ''}`} onClick={() => setIsLangOpen(!isLangOpen)}>
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
                                    <div key={car.id} className="searchResultCard" onClick={() => handleSelectCar(car.id)}>
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