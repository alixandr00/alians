import React from 'react'
import './AutoFromChina.css'
import { HeroSection } from './Herosection'
import { QuickSearchSection } from './QuickSearchSection'
import { PopularCarsSection } from './PopularCarsSection'
import { AdvantagesSection } from './AdvantagesSection'
import { HowWeWorkSection } from './HowWeWorkSection'
import { ConsultationFormSection } from './ConsultationFormSection'

export const AutoFromChina = ({ selectedCountry }) => {
    return (
        <div className='container'>
            <HeroSection />
            <QuickSearchSection />
            <div className='block'>
                <PopularCarsSection selectedCountry={selectedCountry} />
                <AdvantagesSection />
                <HowWeWorkSection />
                <ConsultationFormSection />
            </div>
        </div>
    )
}
