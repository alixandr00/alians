import React from 'react';
import './HowWeWorkSection.css';
// Добавил IoBusOutline для этапа доставки
import { IoPersonOutline, IoCarOutline, IoDocumentTextOutline, IoBusOutline } from 'react-icons/io5';
import ProcessImage from '../../assets/SOK6363-762x456.jpg';
import { useTranslation } from 'react-i18next';

const processSteps = [
    {
        icon: IoPersonOutline,
        titleKey: 'step_request_title',
        descKey: 'step_request_desc',
    },
    {
        icon: IoCarOutline,
        titleKey: 'step_selection_title',
        descKey: 'step_selection_desc',
    },
    {
        icon: IoDocumentTextOutline,
        titleKey: 'step_contract_title',
        descKey: 'step_contract_desc',
    },
    // НОВЫЙ ЭТАП
    {
        icon: IoBusOutline,
        titleKey: 'step_delivery_title',
        descKey: 'step_delivery_desc',
    },
];

export const HowWeWorkSection = () => {
    const { t } = useTranslation();

    return (
        <section className="howWeWorkSection">
            <h2 className="sectionTitle">{t('how_we_work_title')}</h2>

            <div className="processCardContainer">
                <div className="imageWrapper">
                    <img
                        src={ProcessImage}
                        alt={t('work_process_alt')}
                        className="processImage"
                    />
                    <div className="imageGradientOverlay"></div>
                </div>

                <div className="stepsWrapper">
                    <div className="stepsGrid">
                        {processSteps.map((step, index) => (
                            <div className="stepItem" key={index}>
                                <div className="stepTitleBlock">
                                    <div className="stepIconWrapper">
                                        <step.icon className="stepIcon" />
                                    </div>
                                    <h3 className="stepTitle">{t(step.titleKey)}</h3>
                                </div>
                                <p className="stepDescription">{t(step.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};