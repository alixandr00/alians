import React from 'react';
import { CarView360 } from '../../src/components/CarView360/CarView360'; // Проверь путь до компонента

export const TestPage = () => {
    // Создаем массив путей к твоим 24 фото в папке public/test-car
    // i + 1 потому что фото называются 1.jpg, 2.jpg...
    const carImages = Array.from({ length: 24 }, (_, i) => `/test-car/${i + 1}.jpg`);

    return (
        <div style={{ padding: '50px 0', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center' }}>Тест 3D осмотра автомобиля</h1>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: '#fff',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}>
                <CarView360 images={carImages} />
            </div>
        </div>
    );
};
