import React from 'react';
import { IoCashOutline, IoCarOutline, IoDocumentTextOutline, IoRocketOutline } from 'react-icons/io5';
import './AdvantagesSection.css';
import { useTranslation } from 'react-i18next'; // Импорт

const advantagesData = [
    {
        icon: IoCashOutline,
        titleKey: 'adv_price_title',
        descKey: 'adv_price_desc'
    },
    {
        icon: IoCarOutline,
        titleKey: 'adv_selection_title',
        descKey: 'adv_selection_desc'
    },
    {
        icon: IoDocumentTextOutline,
        titleKey: 'adv_contract_title',
        descKey: 'adv_contract_desc'
    },
    {
        icon: IoRocketOutline,
        titleKey: 'adv_delivery_title',
        descKey: 'adv_delivery_desc'
    },
];

export const AdvantagesSection = () => {
    const { t } = useTranslation(); // Инициализация

    return (
        <section className="advantagesSection">
            <h2 className="sectionTitle">{t('advantages_main_title')}</h2>

            <div className="advantagesGrid">
                {advantagesData.map((item, index) => (
                    <div className="advantageItem" key={index}>
                        <div className="titleBlock">
                            <div className="iconWrapper">
                                <item.icon className="advantageIcon" />
                            </div>
                            {/* Перевод заголовка карточки */}
                            <h3 className="advantageTitle">{t(item.titleKey)}</h3>
                        </div>
                        {/* Перевод описания карточки */}
                        <p className="advantageDescription">{t(item.descKey)}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};