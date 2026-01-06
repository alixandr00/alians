import React from 'react'
import './AutoFromChina.css'
import { HeroSection } from '../HeroSection/Herosection'
import { QuickSearchSection } from '../QuickSearch/QuickSearchSection'
import { PopularCarsSection } from '../PopularCars/PopularCarsSection'
import { AdvantagesSection } from '../Advantages/AdvantagesSection'
import { HowWeWorkSection } from '../HowWeWork/HowWeWorkSection'
import { ConsultationFormSection } from '../Consultation/ConsultationFormSection'
import { CarView360 } from '../CarView360/CarView360'
// const testImages = Array.from({ length: 24 }, (_, i) => `/test-car/beatle (${i + 1}).png`);

export const AutoFromChina = ({ selectedCountry }) => {
    return (
        <div className='container'>
            <HeroSection />
            <QuickSearchSection />
            <div className='block'>
                <PopularCarsSection selectedCountry={selectedCountry} />
                <AdvantagesSection />
                <HowWeWorkSection />
                {/* <div style={{ marginTop: '50px' }}>
                    <h2 style={{ textAlign: 'center' }}>3D Осмотр автомобиля</h2>
                    <CarView360 images={testImages} />
                </div> */}
                <ConsultationFormSection />
                {/* 2. Передаем массив в пропс images */}
            </div>
        </div>
    )
}
