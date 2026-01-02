import React, { useState, useRef } from 'react';
import './CarView360.css';

export const CarView360 = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isDragging = useRef(false);
    const startX = useRef(0);

    // images — это массив ссылок на твои 24 фото
    const totalFrames = images.length;

    const handleStart = (e) => {
        isDragging.current = true;
        startX.current = e.pageX || e.touches[0].pageX;
    };

    const handleEnd = () => {
        isDragging.current = false;
    };

    const handleMove = (e) => {
        if (!isDragging.current) return;

        const currentX = e.pageX || e.touches[0].pageX;
        const diff = startX.current - currentX;

        // Чувствительность: через сколько пикселей менять кадр
        const sensitivity = 15;

        if (Math.abs(diff) > sensitivity) {
            if (diff > 0) {
                // Крутим в одну сторону
                setCurrentIndex((prev) => (prev + 1) % totalFrames);
            } else {
                // Крутим в другую сторону
                setCurrentIndex((prev) => (prev - 1 + totalFrames) % totalFrames);
            }
            startX.current = currentX;
        }
    };

    return (
        <div
            className="view-360-container"
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
        >
            <img
                src={images[currentIndex]}
                alt={`Car frame ${currentIndex}`}
                draggable="false"
                className="view-360-image"
            />
            <div className="view-360-hint">Потяните, чтобы повернуть</div>
        </div>
    );
};
