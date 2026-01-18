import React from 'react';
import CarImage from '../../assets/Audi Q5 2021 3.webp';
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { RiWhatsappFill } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

export const HeroSection = () => {
    const { t } = useTranslation();

    return (
        <section className="heroSection">
            <div className="heroContent">
                <h1 className="heroTitle">{t('hero_title')}</h1>

                <p className="heroCountries">
                    {t('hero_countries')}
                </p>

                <p className="heroSubtitle">
                    {t('hero_subtitle')}
                </p>

                <div className="heroButtons">
                    <Link to="/catalog" className="buttonPrimary">
                        {t('btn_pick_car')}
                    </Link>
                    <a
                        href="https://wa.me/996551460902"
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

            <div className="heroImageContainer">
                <img src={CarImage} alt={t('hero_car_alt')} className="heroCarImage" />
            </div>
        </section>
    );
};