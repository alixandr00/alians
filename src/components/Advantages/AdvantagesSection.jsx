import React, { useState } from 'react'; // Добавили useState
import { IoCashOutline, IoCarOutline, IoDocumentTextOutline, IoRocketOutline, IoCloseOutline } from 'react-icons/io5';
import './AdvantagesSection.css';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    // Состояние для хранения выбранной карточки (объекта)
    const [selectedAdv, setSelectedAdv] = useState(null);

    return (
        <section className="advantagesSection">
            <h2 className="sectionTitle">{t('advantages_main_title')}</h2>

            <div className="advantagesGrid">
                {advantagesData.map((item, index) => (
                    <div
                        className="advantageItem"
                        key={index}
                        onClick={() => setSelectedAdv(item)} // Открываем модалку при клике
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="titleBlock">
                            <div className="iconWrapper">
                                <item.icon className="advantageIcon" />
                            </div>
                            <h3 className="advantageTitle">{t(item.titleKey)}</h3>
                        </div>
                        <p className="advantageDescription">{t(item.descKey)}</p>
                    </div>
                ))}
            </div>

            {/* --- МОДАЛЬНОЕ ОКНО --- */}
            {selectedAdv && (
                <div className="advModalOverlay" onClick={() => setSelectedAdv(null)}>
                    <div className="advModalContent" onClick={(e) => e.stopPropagation()}>
                        <button className="advModalClose" onClick={() => setSelectedAdv(null)}>
                            <IoCloseOutline />
                        </button>

                        <div className="advModalIconWrapper">
                            <selectedAdv.icon className="advModalIcon" />
                        </div>

                        <h3 className="advModalTitle">{t(selectedAdv.titleKey)}</h3>
                        <p className="advModalDescription">{t(selectedAdv.descKey)}</p>
                    </div>
                </div>
            )}
        </section>
    );
};