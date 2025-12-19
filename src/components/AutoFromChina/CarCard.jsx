import React from 'react';
import './CarCard.css';

// Добавляем onClick в деструктуризацию пропсов
export const CarCard = ({ car, isCatalog = false, viewType = 'dots', onClick }) => {
    // Выбираем главный класс контейнера
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
                        <span>{car.year} г.</span>
                        <span className="carCard_sep">|</span>
                        <span>{car.transmission}</span>
                        <span className="carCard_sep">|</span>
                        <span>{car.mileage?.toLocaleString()} км</span>
                    </div>

                    <div className="carCard_btns">
                        <button className="carCard_btnDetail" onClick={onClick}>
                            Подробнее
                        </button>

                        {viewType === 'order' ? (
                            <button className="carCard_btnOrder">Под заказ</button>
                        ) : (
                            <button className="carCard_btnDots">...</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};