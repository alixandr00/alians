import React, { useState } from 'react';
import './CarCard.css';
import { useTranslation } from 'react-i18next';

// --- КОМПОНЕНТ ДЛЯ ЗАГРУЗКИ (СКЕЛЕТОН) ---
export const CarCardSkeleton = ({ isCatalog = false }) => {
    const cardClass = isCatalog ? "carCard_catalog skeleton-card" : "carCard_slider skeleton-card";

    return (
        <div className={cardClass}>
            <div className="carCard_imageBox skeleton-item"></div>

            <div className="carCard_info">
                <div className="carCard_row1">
                    <div className="skeleton-item skeleton-title"></div>
                    <div className="skeleton-item skeleton-price"></div>
                </div>

                <div className="carCard_footer">
                    <div className="carCard_params skeleton-item skeleton-params-line"></div>

                    <div className="carCard_btns">
                        <div className="skeleton-item skeleton-btn-main"></div>
                        <div className="skeleton-item skeleton-btn-sq"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CarCard = ({ car, isCatalog = false, viewType = 'dots', onClick }) => {
    const { t } = useTranslation();
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
                        <span>{car.year} {t('unit_year')}</span>
                        <span className="carCard_sep">|</span>
                        <span>{t(car.transmission?.toLowerCase())}</span>
                        <span className="carCard_sep">|</span>
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