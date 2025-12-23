import React, { useState, useEffect } from 'react'; // Добавили useEffect
import { supabase } from '../../api/supabaseClient'; // Импорт клиента
import { CarCard } from '../../components/Home/CarCard';
import './CatalogPage.css';

export const CatalogPage = () => {
    const [cars, setCars] = useState([]); // Все машины из БД
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;

    useEffect(() => {
        const fetchCars = async () => {
            const { data, error } = await supabase
                .from('car-cards')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error) setCars(data);
        };
        fetchCars();
    }, []);

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const totalPages = Math.ceil(cars.length / carsPerPage);

    return (
        <div className="catalogContainer">
            <aside className="filterSidebar">
                <h3>Фильтр</h3>
                <div className="filterGroup">
                    <label>Марка</label>
                    <select>
                        <option>Все марки</option>
                        <option>Audi</option>
                        <option>BMW</option>
                    </select>
                </div>
            </aside>

            <main className="catalogContent">
                <div className="carsGrid">
                    {currentCars.length > 0 ? (
                        currentCars.map(car => (
                            <CarCard key={car.id} car={car} isCatalog={true} viewType="dots" />
                        ))
                    ) : (
                        <p>Машины не найдены...</p>
                    )}
                </div>

                {/* Пагинация */}
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? 'active' : ''}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};