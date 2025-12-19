// src/components/Home/HowWeWorkSection.jsx
import React from 'react';
import './HowWeWorkSection.css';
import { IoPersonOutline, IoCarOutline, IoDocumentTextOutline } from 'react-icons/io5';
// Убедитесь, что путь к картинке верный
import ProcessImage from '../../assets/SOK6363-762x456.jpg';

const processSteps = [
    {
        icon: IoPersonOutline,
        title: 'Заявка',
        description: 'Оставьте заявку на подбор авто',
    },
    {
        icon: IoCarOutline,
        title: 'Подбор',
        description: 'Находим авто в Китае под ваш бюджет',
    },
    {
        icon: IoDocumentTextOutline,
        title: 'Договор',
        description: 'Заключаем договор и влазим в растаможку',
    },
];

export const HowWeWorkSection = () => {
    return (
        <section className="howWeWorkSection">
            <h2 className="sectionTitle">Как мы работаем</h2>

            <div className="processCardContainer">
                {/* Изображение идет фоном или абсолютным блоком */}
                <div className="imageWrapper">
                    <img
                        src={ProcessImage}
                        alt="Процесс работы"
                        className="processImage"
                    />
                    <div className="imageGradientOverlay"></div>
                </div>

                {/* Контент, который накладывается сверху */}
                <div className="stepsWrapper">
                    <div className="stepsGrid">
                        {processSteps.map((step, index) => (
                            <div className="stepItem" key={index}>
                                <div className="stepTitleBlock">
                                    <div className="stepIconWrapper">
                                        <step.icon className="stepIcon" />
                                    </div>
                                    <h3 className="stepTitle">{step.title}</h3>
                                </div>
                                <p className="stepDescription">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};