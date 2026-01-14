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
    IoMailOutline,
    IoCarSportOutline
} from 'react-icons/io5';
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// Импорт твоих данных (путь должен быть верным)
import { row1Brands, row2Brands } from '../../data/CarsData';

export const Header = ({ onCountrySelect }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    // Объединяем базы брендов для поиска
    const allBrandsData = [...row1Brands, ...row2Brands];

    // --- STATES ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- SEARCH STATES ---
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // --- REFS ---
    const langRef = useRef(null);
    const countryRef = useRef(null);
    const searchRef = useRef(null);

    // --- FIREBASE CONFIG & LOGIC (Твой код) ---
    const firebaseConfig = {
        apiKey: "AIzaSyDJciFDRXMa0uJYLvYVxqtyEG7xF3smb2A",
        authDomain: "my-push-app-577de.firebaseapp.com",
        projectId: "my-push-app-577de",
        storageBucket: "my-push-app-577de.firebasestorage.app",
        messagingSenderId: "450323374994",
        appId: "1:450323374994:web:da319d4fb607fcd0e9174b"
    };

    // Инициализируем только один раз вне рендера или внутри useEffect, 
    // но здесь оставим как у тебя, чтобы не ломать логику
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    useEffect(() => {
        let timer;
        if (isModalOpen) {
            timer = setTimeout(async () => {
                try {
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

    // --- CLICK OUTSIDE HANDLER ---
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) setIsLangOpen(false);
            if (countryRef.current && !countryRef.current.contains(event.target)) setIsCountryOpen(false);
            if (searchRef.current && !searchRef.current.contains(event.target)) setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- SEARCH LOGIC (Бренд -> Модели) ---
    useEffect(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSuggestions([]);
            return;
        }

        // 1. Проверяем точное совпадение с именем бренда
        const exactBrand = allBrandsData.find(b => b.name.toLowerCase() === query);

        if (exactBrand) {
            // Если ввели бренд (или кликнули на него) -> показываем МОДЕЛИ
            const models = exactBrand.models.map(m => ({
                type: 'model',
                brandName: exactBrand.name,
                name: m,
                image: exactBrand.icon // Картинка бренда для модели
            }));
            setSuggestions(models);
        } else {
            // 2. Иначе ищем БРЕНДЫ по буквам
            const brands = allBrandsData
                .filter(b => b.name.toLowerCase().includes(query))
                .map(b => ({
                    type: 'brand',
                    name: b.name,
                    image: b.icon
                }));
            setSuggestions(brands);
        }
    }, [searchTerm]);

    const handleSelectSuggestion = (item) => {
        if (item.type === 'brand') {
            // Выбрали бренд -> ставим его имя в поиск, чтобы useEffect показал модели
            setSearchTerm(item.name);
        } else {
            // Выбрали модель -> переходим
            navigate(`/catalog?brand=${item.brandName}&model=${item.name}`);
            setSearchTerm('');
            setShowSuggestions(false);
            setIsMenuOpen(false);
        }
    };

    // --- DATA ---
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

    const handleCountrySelectAction = (country) => {
        setIsCountryOpen(false);
        if (country.id === 'china' || country.id === 'kgz') {
            setSelectedCountry(country);
            if (onCountrySelect) onCountrySelect(country.id);
            navigate('/');
            setIsMenuOpen(false);
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <header className="headerContainer">
            {/* БУРГЕР */}
            <div className="burgerButton" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </div>

            {/* ЛОГОТИП */}
            <div className="logoBlock" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <span className="logoIcon">{'<'}</span>
                <span className="logoText">Alians</span>
            </div>

            {/* ВЫЕЗЖАЮЩЕЕ МЕНЮ */}
            <div className={`navWrapper ${isMenuOpen ? 'active' : ''}`}>
                {/* ЗАГОЛОВОК МОБИЛЬНОГО МЕНЮ + КНОПКА ЗАКРЫТЬ */}
                <div className="mobileMenuHeader">
                    <span className="logoText">{t('menu')}</span>
                    <IoCloseOutline className="closeMenuIcon" onClick={() => setIsMenuOpen(false)} />
                </div>

                <nav className="navMenu">
                    {/* ВЫБОР СТРАНЫ */}
                    <div className="countrySelectWrapper" ref={countryRef}>
                        <div className={`countrySelectBtn ${isCountryOpen ? 'active' : ''}`} onClick={() => setIsCountryOpen(!isCountryOpen)}>
                            <span className="navLink activeLink">{t(`countries.${selectedCountry.id}`)}</span>
                            <IoChevronDownOutline className={`arrowIcon ${isCountryOpen ? 'rotate' : ''}`} />
                        </div>
                        {isCountryOpen && (
                            <div className="countryDropdownList">
                                {countries.map((c) => (
                                    <div key={c.id} className={`countryOptionItem ${selectedCountry.id === c.id ? 'current' : ''}`} onClick={() => handleCountrySelectAction(c)}>
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

                {/* ВЫБОР ЯЗЫКА */}
                <div className="customLangWrapper" ref={langRef}>
                    <div className={`langSelectBtn ${isLangOpen ? 'active' : ''}`} onClick={() => setIsLangOpen(!isLangOpen)}>
                        <Flag code={currentLanguage.country} className="selectedFlagImg" />
                        <span className="selectedText">{currentLanguage.code.toUpperCase()}</span>
                        <IoChevronDownOutline className={`arrowIcon ${isLangOpen ? 'rotate' : ''}`} />
                    </div>
                    {isLangOpen && (
                        <div className="langDropdownList">
                            {languages.map((lang) => (
                                <div key={lang.code} className={`langOptionItem ${i18n.language === lang.code ? 'current' : ''}`} onClick={() => { i18n.changeLanguage(lang.code); setIsLangOpen(false); }}>
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

            {/* --- ПОИСК (Используем твои классы contactSearchBlock2) --- */}
            <div className="contactSearchBlock2" ref={searchRef}>
                <div className="searchWrapper">
                    <IoSearchOutline className="searchIcon" />
                    <input
                        type="text"
                        className="phoneNumberInput"
                        placeholder={t('search_placeholder') || "Поиск..."}
                        value={searchTerm}
                        onFocus={() => setShowSuggestions(true)}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {showSuggestions && suggestions.length > 0 && (
                        <div className="searchResultsDropdown">
                            {suggestions.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="searchResultCard"
                                    onClick={() => handleSelectSuggestion(item)}
                                >
                                    {/* Если image - это URL или путь, отображаем. Если нет - заглушку */}
                                    {typeof item.image === 'string' ? (
                                        <img src={item.image} alt="" className="searchItemImg" />
                                    ) : (
                                        <IoCarSportOutline style={{ fontSize: '24px', marginRight: '10px', color: '#888' }} />
                                    )}

                                    <div className="resultInfo">
                                        <span className="resultTitle">{item.name}</span>
                                        <span className="resultPrice" style={{ fontSize: '11px', color: '#27ae60' }}>
                                            {item.type === 'brand' ? t('search.select_brand') : t('search.go_to_model')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- МОДАЛКА (При недоступной стране) --- */}
            {isModalOpen && (
                <div className={`modalOverlay ${i18n.language === 'ar' ? 'rtl' : ''}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                    <div className="unavailableModal">
                        <button className="modalCloseX" onClick={() => setIsModalOpen(false)}>
                            <IoCloseOutline />
                        </button>
                        <h2 className="modalTitle">{t('modal.title')}</h2>
                        <p className="modalText">{t('modal.text')}</p>
                        <p className="modalSubText">{t('modal.subtext')}</p>
                        <div className="modalNotifyBlock">
                            <IoMailOutline className="mailIcon" />
                            <span>{t('modal.notify')}</span>
                        </div>
                        <button className="submitRequestBtn" onClick={() => { setIsModalOpen(false); navigate('/contacts'); }}>
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