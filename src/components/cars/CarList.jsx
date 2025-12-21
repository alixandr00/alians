import { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient';

// Принимаем cars из App.jsx, чтобы данные всегда были актуальны
export default function CarList({ cars: propsCars }) {
    const [localCars, setLocalCars] = useState([]);

    // 1. ОДНА функция для загрузки (теперь она не красная)
    const fetchCars = async () => {
        const { data, error } = await supabase
            .from('car-cards')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Ошибка загрузки:', error);
        } else {
            setLocalCars(data);
        }
    };

    // 2. Загружаем данные при первом запуске
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCars();
    }, []);

    // 3. Если App.jsx присылает новые данные (после добавления), обновляем локальный список
    useEffect(() => {
        if (propsCars && propsCars.length > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLocalCars(propsCars);
        }
    }, [propsCars]);

    return (
        <div style={{ padding: '20px', overflowX: 'auto' }}>
            <h3>Список машин в базе</h3>
            {/* Теперь fetchCars видна кнопке */}
            <button onClick={fetchCars} style={{ marginBottom: '10px' }}>
                Обновить вручную
            </button>

            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th>Фото</th>
                        <th>Модель/Марка</th>
                        <th>Цена/Год</th>
                        <th>Пробег</th>
                        <th>Топливо/КПП</th>
                        <th>Опции (Specs)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Используем localCars, которые мы получили */}
                    {localCars.map(car => (
                        <tr key={car.id}>
                            <td>
                                <img src={car.image} alt={car.title} style={{ width: '80px', borderRadius: '4px' }} />
                            </td>
                            <td><strong>{car.brand}</strong> {car.title}</td>
                            <td>${car.price} / {car.year}</td>
                            <td>{car.mileage} км</td>
                            <td>{car.fuel} / {car.transmission}</td>
                            <td>
                                {car.specs?.map((spec, i) => (
                                    <span key={i} style={{ background: '#ddd', margin: '2px', padding: '2px 5px', borderRadius: '3px', fontSize: '12px', display: 'inline-block' }}>
                                        {spec}
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}