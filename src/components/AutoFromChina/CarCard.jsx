import React, { useState } from 'react'; // Добавили useState
import './CarCard.css';

export const CarCard = ({ car, isCatalog = false, viewType = 'dots', onClick }) => {
    // Состояние для показа кнопки удаления
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
                        <span>{car.year} г.</span>
                        <span className="carCard_sep">|</span>
                        <span>{car.transmission}</span>
                        <span className="carCard_sep">|</span>
                        <span>{car.mileage?.toLocaleString()} км</span>
                    </div>

                    <div className="carCard_btns" style={{ position: 'relative' }}>
                        <button className="carCard_btnDetail" onClick={onClick}>
                            Подробнее
                        </button>

                        {viewType === 'order' ? (
                            <button className="carCard_btnOrder">Под заказ</button>
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