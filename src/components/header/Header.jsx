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
    IoChevronDownOutline,
    IoMailOutline // Добавил иконку почты для модалки
} from 'react-icons/io5';
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

export const Header = ({ searchTerm, setSearchTerm, onCountrySelect }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модалки
    const [suggestions, setSuggestions] = useState([]);

    const langRef = useRef(null);
    const countryRef = useRef(null);

    const firebaseConfig = {
        apiKey: "AIzaSyDJciFDRXMa0uJYLvYVxqtyEG7xF3smb2A",
        authDomain: "my-push-app-577de.firebaseapp.com",
        projectId: "my-push-app-577de",
        storageBucket: "my-push-app-577de.firebasestorage.app",
        messagingSenderId: "450323374994",
        appId: "1:450323374994:web:da319d4fb607fcd0e9174b"
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    useEffect(() => {
        let timer;
        if (isModalOpen) {
            // Ждем 2.5 секунды после открытия модалки
            timer = setTimeout(async () => {
                try {
                    // Проверяем, не давал ли пользователь разрешение ранее
                    if (Notification.permission === 'default') {
                        const permission = await Notification.requestPermission();
                        if (permission === 'granted') {
                            const currentToken = await getToken(messaging, {
                                vapidKey: 'BHEmaEkuy9d5KTA78i5BRPBNuEJI3y-y-AVpR6bKybAv1ryrGF48E61Ap-wipEzL1CUnKcQF_788Cz0dZVzJRmk'
                            });

                            if (currentToken) {
                                await supabase
                                    .from('push_subscriptions')
                                    .insert([{
                                        token: currentToken,
                                        subscription_data: { platform: 'header_modal' }
                                    }]);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Ошибка Firebase в хедере:', error);
                }
            }, 2500);
        }
        return () => clearTimeout(timer);
    }, [isModalOpen]);

    const countries = [
        { id: 'kgz', countryCode: 'KGZ' },
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) setIsLangOpen(false);
            if (countryRef.current && !countryRef.current.contains(event.target)) setIsCountryOpen(false);
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

    // ОБНОВЛЕННАЯ ФУНКЦИЯ ВЫБОРА СТРАНЫ
    const handleCountrySelect = (country) => {
        setIsCountryOpen(false); // Закрываем выпадающий список стран

        if (country.id === 'china') {
            // Если выбрали Китай:
            setSelectedCountry(country); // Устанавливаем как активную
            setIsMenuOpen(false);        // Закрываем мобильное меню, если оно открыто
            navigate('/');               // Переходим на главную

            if (onCountrySelect) {
                onCountrySelect(country.id);
            }
        } else {
            // Если выбрали любую другую страну — показываем модалку
            setIsModalOpen(true);
        }
    };

    return (
        <header className="headerContainer">
            {/* 1. Слева: Бургер */}
            <div className="burgerButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </div>

            {/* 2. В центре: Логотип */}
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
                                    <div // Заменил NavLink на div, чтобы клик обрабатывался только нашей функцией
                                        key={c.id}
                                        className={`countryOptionItem ${selectedCountry.id === c.id ? 'current' : ''}`}
                                        onClick={() => handleCountrySelect(c)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Flag code={c.countryCode} className="optionFlagImg" />
                                        <span>{t(`countries.${c.id}`)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <NavLink to="/catalog" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_catalog')}</NavLink>
                    <NavLink to="/contacts" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_contacts')}</NavLink>
                    <NavLink to="/faq" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_faq')}</NavLink>
                    <NavLink to="/calculator" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_calc')}</NavLink>
                    <NavLink to="/auth" className="navLink" onClick={() => setIsMenuOpen(false)}>{t('nav_login')}</NavLink>
                </nav>

                {/* Селект языка (без изменений) */}
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

            </div>
            {/* --- 3. НОВОЕ МЕСТО ДЛЯ ПОИСКА (Вырезали снизу, вставили сюда) --- */}
            <div className="contactSearchBlock2 "> {/* Добавил класс headerSearch для стилей */}
                <div className="searchWrapper">
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


            {/* --- МОДАЛЬНОЕ ОКНО --- */}
            {isModalOpen && (
                <div className={`modalOverlay ${i18n.language === 'ar' ? 'rtl' : ''}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                    <div className="unavailableModal">
                        <button className="modalCloseX" onClick={() => setIsModalOpen(false)}>
                            <IoCloseOutline />
                        </button>

                        <h2 className="modalTitle">{t('modal.title')}</h2>

                        <p className="modalText">
                            {t('modal.text')}
                        </p>

                        <p className="modalSubText">
                            {t('modal.subtext')}
                        </p>

                        <div className="modalNotifyBlock">
                            <IoMailOutline className="mailIcon" />
                            <span>{t('modal.notify')}</span>
                        </div>

                        <button
                            className="submitRequestBtn"
                            onClick={() => {
                                setIsModalOpen(false);
                                setIsMenuOpen(false);
                                navigate('/contacts');
                            }}
                        >
                            {t('modal.submit')}
                        </button>

                        <button className="closeModalBtn" onClick={() => setIsModalOpen(false)}>
                            {t('modal.close')}
                        </button>
                    </div>
                </div>
            )}

            {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </header>
    );
};