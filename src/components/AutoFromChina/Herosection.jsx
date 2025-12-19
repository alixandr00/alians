import React from 'react';
import CarImage from '../../assets/SOK6363-762x456.jpg'; // Ваш файл с изображением
import './HeroSection.css';
import { Link } from 'react-router-dom';
import { RiWhatsappFill } from "react-icons/ri";


export const HeroSection = () => {
    return (
        <section className="heroSection">
            <div className="heroContent">


                <h1 className="heroTitle">Автомобили из Китая под заказ</h1>
                <p className="heroSubtitle">
                    Получите лучший автомобиль из Китая с экономией до 30%
                </p>

                {/* Кнопки */}
                <div className="heroButtons">
                    <Link to="/catalog" className="buttonPrimary">
                        Подобрать авто
                    </Link>
                    <a
                        href="https://wa.me/996221222125"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buttonSecondary"
                    >
                        <span className="whatsappIcon"><RiWhatsappFill color='#309f0bff' />
                        </span> WhatsApp
                    </a>
                </div>
            </div>

            {/* Изображение, которое будет растянуто на фон контейнера */}
            <div className="heroImageContainer">
                {/* Картинка будет фоном для div, но для доступности лучше использовать img */}
                <img src={CarImage} alt="Автомобиль Audi Q5" className="heroCarImage" />
            </div>
        </section>
    );
};
