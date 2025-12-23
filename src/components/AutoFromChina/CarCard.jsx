import React, { useState } from 'react';
import './CarCard.css';
import { useTranslation } from 'react-i18next'; // Импорт хука

export const CarCard = ({ car, isCatalog = false, viewType = 'dots', onClick }) => {
    const { t } = useTranslation(); // Инициализация
    const [showDelete, setShowDelete] = useState(false);

    const cardClass = isCatalog ? "carCard_catalog" : "carCard_slider";

    return (
        <div className={cardClass}>
            <div className="carCard_imageBox">
                <img src={car.image} alt={car.title} />
            </div>

            <div className="carCard_info">
                <div className="carCard_row1">
                    <h3 className="carCard_name">{car.title}</h3>
                    <span className="carCard_priceMain">${car.price?.toLocaleString()}</span>
                </div>

                {isCatalog && (
                    <div className="carCard_priceSub">${car.price?.toLocaleString()}</div>
                )}

                <div className="carCard_footer">
                    <div className="carCard_params">
                        {/* Год */}
                        <span>{car.year} {t('unit_year')}</span>
                        <span className="carCard_sep">|</span>

                        {/* Трансмиссия (переводится динамически) */}
                        <span>{t(car.transmission?.toLowerCase())}</span>

                        <span className="carCard_sep">|</span>

                        {/* Пробег */}
                        <span>{car.mileage?.toLocaleString()} {t('unit_km')}</span>
                    </div>

                    <div className="carCard_btns" style={{ position: 'relative' }}>
                        <button className="carCard_btnDetail" onClick={onClick}>
                            {t('details')}
                        </button>

                        {viewType === 'order' ? (
                            <button className="carCard_btnOrder">
                                {t('nav_catalog')}
                            </button>
                        ) : (
                            <div className="dotsContainer">
                                <button
                                    className="carCard_btnDots"
                                    onClick={() => setShowDelete(!showDelete)}
                                >
                                    ...
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};