import React, { useState, useRef, useEffect } from 'react';
import './ConsultationFormSection.css';
import { IoChevronDown } from 'react-icons/io5';

const countries = [
    { code: '+996', flag: '🇰🇬', name: 'Кыргызстан' },
    { code: '+7', flag: '🇰🇿', name: 'Казахстан' },
    { code: '+7', flag: '🇷🇺', name: 'Россия' },
];

const locations = [
    { country: "Кыргызстан", cities: ["Бишкек", "Ош", "Чуйская обл.", "Иссык-Кульская обл.", "Нарынская обл.", "Таласская обл.", "Джалал-Абадская обл.", "Баткенская обл.", "Чуйская обл."] },
    { country: "Казахстан", cities: ["Алматы", "Астана", "Шымкент", "Караганда", "Актобе"] },
    { country: "Россия", cities: ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань"] }
];

export const ConsultationFormSection = () => {
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
        const message = `Новая заявка!\nИмя: ${name}\nТелефон: ${fullPhone}\nГород: ${selectedCity || 'Не указан'}`;

        // --- ОТПРАВКА В WHATSAPP ---
        const whatsappNumber = "996221222125"; // ВПИШИ СВОЙ НОМЕР БЕЗ +
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');

        // Если нужно в Email, можно использовать:
        // window.location.href = `mailto:tvoi@email.com?subject=Заявка&body=${encodeURIComponent(message)}`;
    };

    return (
        <section className="consultationSection">
            <div className="formContentWrapper">
                <div className="textBlock">
                    <h2 className="sectionTitle">Остались вопросы? Получите бесплатную консультацию!</h2>
                    <p className="subtitle">Наши эксперты помогут подобрать авто и рассчитать стоимость</p>
                </div>

                <form className="consultationForm" onSubmit={handleSubmit}>
                    <div className="inputRow">
                        <input
                            type="text"
                            placeholder="Имя"
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
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Только цифры
                            />
                        </div>

                        <div className="cityInputGroup" ref={dropdownRef}>
                            <div
                                className={`citySelectTrigger ${isCityOpen ? 'active' : ''} ${selectedCity ? 'selected' : ''}`}
                                onClick={() => setIsCityOpen(!isCityOpen)}
                            >
                                {selectedCity || "Выберите город"}
                                <IoChevronDown className={`cityArrow ${isCityOpen ? 'rotate' : ''}`} />
                            </div>

                            {isCityOpen && (
                                <div className="cityDropdownList">
                                    {locations.map((group, index) => (
                                        <div key={index} className="cityGroup">
                                            <div className="cityGroupTitle">{group.country}</div>
                                            {group.cities.map((city) => (
                                                <div key={city} className="cityOption" onClick={() => { setSelectedCity(city); setIsCityOpen(false); }}>
                                                    {city}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button type="submit" className="buttonSubmit">Отправить заявку</button>
                    </div>
                </form>
            </div>
        </section>
    );
};