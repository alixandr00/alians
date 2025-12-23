import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { supabase } from '../../api/supabaseClient';

import 'swiper/css';
import 'swiper/css/navigation';
import './PopularCarsSection.css';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { CarCard } from './CarCard'; // Убедись, что путь правильный (./CarCard или ../CarCard)
import { useTranslation } from 'react-i18next';

export const PopularCarsSection = () => {
    const { t } = useTranslation();
    const [popularCars, setPopularCars] = useState([]);

    useEffect(() => {
        const fetchPopular = async () => {
            const { data, error } = await supabase
                .from('car-cards')
                .select('*')
                .limit(10);

            if (!error) setPopularCars(data || []);
        };
        fetchPopular();
    }, []);

    return (
        <section className="popularCarsSection">
            <h2 className="sectionTitlee">{t('popular_cars')}</h2>
            <div className="sliderWrapper">
                <button className="navBtn prev-el"><IoChevronBack /></button>
                <button className="navBtn next-el"><IoChevronForward /></button>
                {popularCars.length > 0 ? (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        navigation={{
                            prevEl: '.prev-el',
                            nextEl: '.next-el',
                        }}
                        centerInsufficientSlides={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.2,
                                centeredSlides: true,
                            },
                            768: {
                                slidesPerView: 2,
                                centeredSlides: false, // Выключаем фокус на центре, чтобы было просто 2 рядом
                                centerInsufficientSlides: true, // Если будет 1 машина - она встанет по центру
                            },
                            1024: {
                                slidesPerView: 3, // Всегда делим экран на 3 части (карточки будут нормального размера)
                                centeredSlides: false, // Выключаем, чтобы ряд начинался слева: [1][2][3] ->
                                centerInsufficientSlides: true, // ГЛАВНОЕ: Если машин 1 или 2, они встанут по центру экрана
                            }
                        }}
                        className="mySwiper"
                    >
                        {popularCars.map(car => (
                            <SwiperSlide key={car.id}>
                                {/* viewType="order" оставляем как ты хотел */}
                                <CarCard car={car} isCatalog={false} viewType="order" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p style={{ textAlign: 'center', padding: '40px' }}>{t('loading_cars')}</p>
                )}
            </div>
            <p className="sectionSubtitle">{t('popular_section_subtitle')}</p>
        </section>
    );
};