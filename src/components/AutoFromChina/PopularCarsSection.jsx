import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './PopularCarsSection.css';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { CarCard } from './CarCard';
import { carsData } from '../../data/CarsData'; // ИМПОРТИРУЕМ ДАННЫЕ

export const PopularCarsSection = () => {
    // Берем, например, первые 4 машины для слайдера
    const popularCars = carsData

    return (
        <section className="popularCarsSection">
            <h2 className="sectionTitlee">Популярные авто</h2>
            <div className="sliderWrapper">
                <button className="navBtn prev-el"><IoChevronBack /></button>
                <button className="navBtn next-el"><IoChevronForward /></button>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    loop={true}
                    navigation={{
                        prevEl: '.prev-el',
                        nextEl: '.next-el',
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2, centeredSlides: false },
                        1024: { slidesPerView: 3, centeredSlides: false }
                    }}
                    className="mySwiper"
                >
                    {popularCars.map(car => (
                        <SwiperSlide key={car.id}>
                            <CarCard car={car} isCatalog={false} viewType="order" />                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <p className="sectionSubtitle">C Alians вам удобно и выгодно</p>
        </section>
    );
};