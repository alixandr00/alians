import React, { useState, useRef, useEffect } from 'react';
import './ConsultationFormSection.css';
import { IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next'; // Импорт хука

export const ConsultationFormSection = () => {
    const { t } = useTranslation();

    // Данные стран и городов теперь динамические
    const countries = [
        { code: '+996', flag: '🇰🇬', name: t('country_kg') },
        { code: '+7', flag: '🇰🇿', name: t('country_kz') },
        { code: '+7', flag: '🇷🇺', name: t('country_ru') },
    ];

    const locations = [
        { country: t('country_kg'), cities: t('cities_kg', { returnObjects: true }) },
        { country: t('country_kz'), cities: t('cities_kz', { returnObjects: true }) },
        { country: t('country_ru'), cities: t('cities_ru', { returnObjects: true }) }
    ];

    const [isCityOpen, setIsCityOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCityOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPhone = `${selectedCountry.code}${phone}`;
        const message = `${t('form_new_lead')}\n${t('form_label_name')}: ${name}\n${t('form_label_phone')}: ${fullPhone}\n${t('form_label_city')}: ${selectedCity || t('not_specified')}`;

        const whatsappNumber = "996221222125";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
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

                        <div className="cityInputGroup" ref={dropdownRef}>
                            <div
                                className={`citySelectTrigger ${isCityOpen ? 'active' : ''} ${selectedCity ? 'selected' : ''}`}
                                onClick={() => setIsCityOpen(!isCityOpen)}
                            >
                                {selectedCity || t('form_placeholder_city')}
                                <IoChevronDown className={`cityArrow ${isCityOpen ? 'rotate' : ''}`} />
                            </div>

                            {isCityOpen && (
                                <div className="cityDropdownList">
                                    {locations.map((group, index) => (
                                        <div key={index} className="cityGroup">
                                            <div className="cityGroupTitle">{group.country}</div>
                                            {Array.isArray(group.cities) && group.cities.map((city) => (
                                                <div key={city} className="cityOption" onClick={() => { setSelectedCity(city); setIsCityOpen(false); }}>
                                                    {city}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
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