import React, { useState } from 'react';
import { carsData } from '../../data/CarsData';
import { CarCard } from '../../components/Home/CarCard'; // Используем твою готовую карточку
import './CatalogPage.css';

export const CatalogPage = () => {
    // Состояние для текущей страницы пагинации
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 3;

    // Пока просто берем все данные (позже добавим фильтрацию)
    const filteredCars = carsData;

    // Логика пагинации
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    return (
        <div className="catalogContainer">
            <aside className="filterSidebar">
                <h3>Фильтр</h3>
                {/* Сюда позже добавим инпуты фильтра */}
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
                    {currentCars.map(car => (
                        <CarCard car={car} isCatalog={true} viewType="dots" />))}
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