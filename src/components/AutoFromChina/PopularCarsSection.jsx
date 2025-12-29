import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { supabase } from '../../api/supabaseClient';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import './PopularCarsSection.css';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { CarCard, CarCardSkeleton } from './CarCard'; // Убедитесь, путь правильный
import { useTranslation } from 'react-i18next';

// 1. Принимаем selectedCountry как пропс
export const PopularCarsSection = ({ selectedCountry }) => {
    const { t } = useTranslation();
    const [popularCars, setPopularCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const handleDetailsClick = (carId) => {
        navigate('/catalog', { state: { selectedCarId: carId } });
    };

    useEffect(() => {
        const fetchPopular = async () => {
            setLoading(true);

            // 2. Формируем запрос
            let query = supabase
                .from('car-cards')
                .select('*')
                .eq('is_popular', true)
                .order('created_at', { ascending: false })
                .limit(10);

            // 3. Если страна выбрана (не null и не 'all'), добавляем фильтр
            // ВАЖНО: Убедитесь, что колонка в базе данных называется 'country' (или 'origin')
            // и значения совпадают (например 'china', 'korea', 'usa')
            if (selectedCountry && selectedCountry !== 'all') {
                query = query.eq('country', selectedCountry);
            }

            const { data, error } = await query;

            if (!error) {
                setPopularCars(data || []);
            } else {
                console.error("Error fetching popular cars:", error);
            }
            setLoading(false);
        };

        fetchPopular();

        // 4. Добавляем selectedCountry в массив зависимостей, 
        // чтобы при смене страны запрос выполнялся заново
    }, [selectedCountry]);

    return (
        <section className="popularCarsSection">
            <h2 className="sectionTitlee">
                {selectedCountry
                    ? `${t('popular_cars')} `
                    : t('popular_cars')}
            </h2>

            <div className="sliderWrapper">
                <button ref={prevRef} className="navBtn prev-el"><IoChevronBack /></button>
                <button ref={nextRef} className="navBtn next-el"><IoChevronForward /></button>

                {loading ? (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={3}
                        breakpoints={{
                            0: { slidesPerView: 1.2, centeredSlides: true },
                            768: { slidesPerView: 2, centeredSlides: false },
                            1024: { slidesPerView: 3, centeredSlides: false }
                        }}
                    >
                        {[1, 2, 3].map((i) => (
                            <SwiperSlide key={i}><CarCardSkeleton isCatalog={false} /></SwiperSlide>
                        ))}
                    </Swiper>
                ) : popularCars.length > 0 ? (
                    <Swiper
                        // Добавляем key, чтобы Swiper пересоздавался при смене данных
                        key={selectedCountry + popularCars.length}
                        modules={[Navigation]}
                        spaceBetween={20}
                        centerInsufficientSlides={true}
                        navigation={{
                            prevEl: 'prevRef.current',
                            nextEl: 'nextRef.current',
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1.2, centeredSlides: true },
                            768: { slidesPerView: 2, centeredSlides: false },
                            1024: { slidesPerView: 3, centeredSlides: false }
                        }}
                        className="mySwiper"
                    >
                        {popularCars.map(car => (
                            <SwiperSlide key={car.id}>
                                <CarCard
                                    car={car}
                                    isCatalog={false}
                                    viewType="order"
                                    onClick={() => handleDetailsClick(car.id)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p style={{ textAlign: 'center', padding: '40px' }}>
                        {t('no_cars_found') || 'Машины не найдены'}
                    </p>
                )}
            </div>
            <p className="sectionSubtitle">{t('popular_section_subtitle')}</p>
        </section>
    );
};