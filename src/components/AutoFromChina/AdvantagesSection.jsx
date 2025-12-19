// src/components/Home/AdvantagesSection.jsx
import React from 'react';
import { IoCashOutline, IoCarOutline, IoDocumentTextOutline, IoRocketOutline } from 'react-icons/io5';
import './AdvantagesSection.css';

const advantagesData = [
    {
        icon: IoCashOutline,
        title: 'Цена',
        description: 'Оставьте заявку на подбор авто'
    },
    {
        icon: IoCarOutline,
        title: 'Подбор',
        description: 'Находим авто в Китае под ваш бюджет'
    },
    {
        icon: IoDocumentTextOutline,
        title: 'Договор',
        description: 'Заключаем договор и влазим в растаможку'
    },
    {
        icon: IoRocketOutline,
        title: 'Доставка',
        description: 'Осуществляем доставку и растаможку авто'
    },
];

export const AdvantagesSection = () => {
    return (
        <section className="advantagesSection">
            <h2 className="sectionTitle">Почему выбирают Alians</h2>

            <div className="advantagesGrid">
                {advantagesData.map((item, index) => (
                    <div className="advantageItem" key={index}>

                        <div className="titleBlock">

                            <div className="iconWrapper">
                                <item.icon className="advantageIcon" />
                            </div>

                            <h3 className="advantageTitle">{item.title}</h3>
                        </div>

                        <p className="advantageDescription">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};