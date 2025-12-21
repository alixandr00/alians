import React, { useEffect, useState } from 'react'; // Добавили useEffect и useState
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { supabase } from '../../api/supabaseClient'; // Импорт клинета

import 'swiper/css';
import 'swiper/css/navigation';
import './PopularCarsSection.css';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { CarCard } from './CarCard';

export const PopularCarsSection = () => {
    const [popularCars, setPopularCars] = useState([]); // Состояние для машин

    useEffect(() => {
        const fetchPopular = async () => {
            const { data, error } = await supabase
                .from('car-cards')
                .select('*')
                .limit(10); // Берем последние 10 для слайдера

            if (!error) setPopularCars(data);
        };
        fetchPopular();
    }, []);

    return (
        <section className="popularCarsSection">
            <h2 className="sectionTitlee">Популярные авто</h2>
            <div className="sliderWrapper">
                <button className="navBtn prev-el"><IoChevronBack /></button>
                <button className="navBtn next-el"><IoChevronForward /></button>

                {/* Рендерим Swiper только если есть машины */}
                {popularCars.length > 0 ? (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        loop={popularCars.length > 3} // Loop работает хорошо только когда много слайдов
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
                                <CarCard car={car} isCatalog={false} viewType="order" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p style={{ textAlign: 'center' }}>Загрузка автомобилей...</p>
                )}
            </div>
            <p className="sectionSubtitle">C Alians вам удобно и выгодно</p>
        </section>
    );
};