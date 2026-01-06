import React from 'react';
import CarImage from '../../assets/Audi Q5 2021 3.webp';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { RiWhatsappFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next'; // Импортируем хук

export const HeroSection = () => {
    const { t } = useTranslation(); // Инициализируем

    return (
        <section className="heroSection">
            <div className="heroContent">
                <h1 className="heroTitle">{t('hero_title')}</h1>
                <p className="heroSubtitle">
                    {t('hero_subtitle')}
                </p>

                {/* Кнопки */}
                <div className="heroButtons">
                    <Link to="/catalog" className="buttonPrimary">
                        {t('btn_pick_car')}
                    </Link>
                    <a
                        href="https://wa.me/996221222125"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buttonSecondary"
                    >
                        <span className="whatsappIcon">
                            <RiWhatsappFill color='#309f0bff' />
                        </span>
                        WhatsApp
                    </a>
                </div>
            </div>

            {/* Изображение */}
            <div className="heroImageContainer">
                <img src={CarImage} alt={t('hero_car_alt')} className="heroCarImage" />
            </div>
        </section>
    );
};