import React, { useState, useRef, useEffect } from 'react';
import './ConsultationFormSection.css';
import { IoChevronDown, IoChevronBack } from 'react-icons/io5'; // Добавил иконку "Назад"
import { useTranslation } from 'react-i18next';

export const ConsultationFormSection = () => {
    const { t } = useTranslation();

    // 1. Обновляем список стран для кода телефона (добавили UZ и AZ)
    const countries = [
        { code: '+996', flag: '🇰🇬', name: t('country_kg') },
        { code: '+998', flag: '🇺🇿', name: t('country_uz') }, // Узбекистан
        { code: '+994', flag: '🇦🇿', name: t('country_az') }, // Азербайджан
        { code: '+7', flag: '🇰🇿', name: t('country_kz') },
        { code: '+7', flag: '🇷🇺', name: t('country_ru') },
    ];

    // 2. Обновляем локации. Теперь это не просто группировка, а источник данных.
    // Убедись, что в файлах перевода (locales) есть массивы cities_uz и cities_az
    const locations = [
        { country: t('country_kg'), cities: t('cities_kg', { returnObjects: true }) },
        { country: t('country_uz'), cities: t('cities_uz', { returnObjects: true }) },
        { country: t('country_az'), cities: t('cities_az', { returnObjects: true }) },
        { country: t('country_kz'), cities: t('cities_kz', { returnObjects: true }) },
        { country: t('country_ru'), cities: t('cities_ru', { returnObjects: true }) }
    ];

    const [isCityOpen, setIsCityOpen] = useState(false);

    // Новое состояние: выбранная "Регион" (страна для списка городов)
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedCity, setSelectedCity] = useState('');

    // Состояние для телефона (левый селект)
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const dropdownRef = useRef(null);

    // Закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCityOpen(false);
                // Опционально: если город не выбран, можно сбрасывать регион, 
                // но лучше оставить как есть для удобства.
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPhone = `${selectedCountry.code}${phone}`;
        // Добавляем информацию о стране города в сообщение
        const regionInfo = selectedRegion ? selectedRegion.country : '';
        const message = `${t('form_new_lead')}\n${t('form_label_name')}: ${name}\n${t('form_label_phone')}: ${fullPhone}\n${t('form_label_city')}: ${selectedCity || t('not_specified')} (${regionInfo})`;

        const whatsappNumber = "996221222125";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    // Логика выбора страны в правом списке
    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setSelectedCity(''); // Сбрасываем город при смене страны
        // Не закрываем isCityOpen, чтобы пользователь сразу мог выбрать город
    };

    // Логика выбора города
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsCityOpen(false);
    };

    // Сброс выбора страны (кнопка "Назад")
    const handleBackToCountries = (e) => {
        e.stopPropagation(); // Чтобы список не закрылся
        setSelectedRegion(null);
        setSelectedCity('');
    };

    // Текст для плейсхолдера
    const getDropdownLabel = () => {
        if (selectedCity) return selectedCity;
        if (selectedRegion) return t('form_placeholder_select_city') || "Выберите город";
        return t('form_placeholder_select_country') || "Выберите страну";
    };

    return (
        <section className="consultationSection">
            <div className="formContentWrapper">
                <div className="textBlock">
                    <h2 className="sectionTitle">{t('consultation_title')}</h2>
                    <p className="subtitle">{t('consultation_subtitle')}</p>
                </div>

                <form className="consultationForm" onSubmit={handleSubmit}>
                    <div className="inputRow">
                        <input
                            type="text"
                            placeholder={t('form_placeholder_name')}
                            className="formInput"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {/* Левый селект для кода телефона */}
                        <div className="phoneInputWrapper">
                            <div className="countrySelect">
                                <select
                                    value={selectedCountry.name}
                                    onChange={(e) => setSelectedCountry(countries.find(c => c.name === e.target.value))}
                                >
                                    {countries.map(c => (
                                        <option key={c.name} value={c.name}>{c.flag} {c.code}</option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="tel"
                                placeholder="000 000 000"
                                className="formInput phoneInput"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>

                        {/* Правый селект (Страна -> Город) */}
                        <div className="cityInputGroup" ref={dropdownRef}>
                            <div
                                className={`citySelectTrigger ${isCityOpen ? 'active' : ''} ${selectedCity ? 'selected' : ''}`}
                                onClick={() => setIsCityOpen(!isCityOpen)}
                            >
                                {getDropdownLabel()}
                                <IoChevronDown className={`cityArrow ${isCityOpen ? 'rotate' : ''}`} />
                            </div>

                            {isCityOpen && (
                                <div className="cityDropdownList">
                                    {/* Если страна НЕ выбрана - показываем список стран */}
                                    {!selectedRegion ? (
                                        <>
                                            <div className="dropdownHeader">{t('choose_country') || "Страна:"}</div>
                                            {locations.map((group, index) => (
                                                <div
                                                    key={index}
                                                    className="cityOption countryOption"
                                                    onClick={() => handleRegionSelect(group)}
                                                >
                                                    {/* Можно добавить флаг сюда, если нужно */}
                                                    {group.country}
                                                    <IoChevronDown style={{ transform: 'rotate(-90deg)', opacity: 0.5 }} />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        /* Если страна выбрана - показываем кнопку Назад и города */
                                        <>
                                            <div className="cityGroupTitle backButton" onClick={handleBackToCountries}>
                                                <IoChevronBack /> {selectedRegion.country}
                                            </div>

                                            {Array.isArray(selectedRegion.cities) && selectedRegion.cities.length > 0 ? (
                                                selectedRegion.cities.map((city) => (
                                                    <div
                                                        key={city}
                                                        className={`cityOption ${city === selectedCity ? 'active' : ''}`}
                                                        onClick={() => handleCitySelect(city)}
                                                    >
                                                        {city}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="cityOption disabled">{t('no_cities') || "Нет городов"}</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="buttonSubmit">{t('btn_submit_form')}</button>
                    </div>
                </form>
            </div>
        </section>
    );
};