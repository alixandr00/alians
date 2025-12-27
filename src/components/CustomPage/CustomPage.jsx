import React, { useState } from 'react';
import Select from 'react-select'; // Не забудьте установить: npm install react-select
import './CustomPage.css';
import { customsRates } from '../../data/CarsData';
import { useTranslation } from 'react-i18next';

// Настройки стоимости доставки по странам (подставьте свои цифры)
const deliveryRates = {
    korea: 2500,
    dubai: 2800,
    georgia: 1800,
    china: 1500,
    usa: 3500
};

export const CustomsPage = () => {
    const { t } = useTranslation();
    const [carType, setCarType] = useState('main');
    const [fuel, setFuel] = useState('petrol');
    const [engine, setEngine] = useState('2000');
    const [year, setYear] = useState('2024');
    const [result, setResult] = useState(null);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    // Новое состояние для страны (по умолчанию Корея)
    const [selectedCountry, setSelectedCountry] = useState(null);

    const countryOptions = [
        { value: 'korea', label: t('country_korea') },
        { value: 'china', label: t('country_china') },
        { value: 'dubai', label: t('country_dubai') },
        { value: 'georgia', label: t('country_georgia') },
        { value: 'usa', label: t('country_usa') }
    ];

    const engineOptions = Object.keys(customsRates['2025']).map(key => key.replace('p', ''));

    const premiumData = {
        'BMW': ['X5', 'X6', 'X7', 'M5'],
        'Mercedes-Benz': ['G-Class', 'S-Class', 'GLE'],
        'Lexus': ['RX', 'LX', 'GX'],
        'Porsche': ['Cayenne', 'Panamera']
    };

    const calculate = () => {
        let tax = 0;
        let baseAutoPrice = 0;
        const yearData = customsRates[year];

        if (yearData) {
            const data = yearData[`p${engine}`];
            if (data) {
                baseAutoPrice = Number(data[0].replace(/[^0-9]/g, ''));
                tax = Number(data[1].replace(/[^0-9]/g, ''));
            }
        }
        if (!selectedCountry) {
            alert(t('calc_select_country'));
            return;
        }

        // Берем стоимость доставки на основе выбранной страны
        const shipping = deliveryRates[selectedCountry] || 0;
        setResult({
            basePrice: baseAutoPrice,
            tax: tax,
            shipping: shipping,
            // Итого: Цена + Таможня + Доставка + Ваша комиссия 1500
            total: baseAutoPrice + tax + shipping + 1500
        });
    };

    const renderCell = (y, v) => {
        const data = customsRates[y]?.[`p${v}`];
        if (!data) return <div className="compositeCell">—</div>;
        return (
            <div className="compositeCell">
                <span className="priceGray">{data[0]}</span>
                <span className="greenText">{data[1]}</span>
            </div>
        );
    };

    const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];
    const petrolVolumes = ['1000', '1500', '1600', '1700', '1800', '2000', '2200', '2500', '3000', '3300', '3500', '4000', '4400', '4600', '5700', '6200'];
    const dieselVolumes = ['2000', '2200', '2500', '3000', '3300', '3500', '3800', '4000', '4500'];

    // Стили для React Select, чтобы он вписался в ваш дизайн
    const customSelectStyles = {
        control: (base) => ({
            ...base,
            borderRadius: '8px',
            borderColor: '#e0e0e0',
            minHeight: '45px',
            boxShadow: 'none',
            '&:hover': { borderColor: '#10b981' }
        })
    };

    return (
        <div className="customsPage">
            <div className="customsContainer">
                <h1 className="mainTitle">{t('calc_title')}</h1>

                <div className="typeTabsContainer">
                    <div className="typeTabs">
                        <button className={carType === 'main' ? 'active' : ''} onClick={() => { setCarType('main'); setResult(null); }}>
                            {t('calc_tab_main')}
                        </button>
                        <button className={carType === 'premium' ? 'active' : ''} onClick={() => { setCarType('premium'); setResult(null); }}>
                            {t('calc_tab_premium')}
                        </button>

                    </div>

                </div>

                <div className="calcGrid">
                    <div className="calcCard inputCard">
                        {/* Выбор страны - теперь он всегда сверху или в ряду */}
                        <div className="inputField">
                            <label>{t('calc_country') || 'Страна покупки'}:</label>
                            <Select
                                options={countryOptions}
                                value={countryOptions.find(opt => opt.value === selectedCountry) || null}
                                onChange={(option) => setSelectedCountry(option ? option.value : null)}
                                styles={customSelectStyles}
                                placeholder={t('calc_select_country')}
                                isSearchable={false}
                            />
                        </div>

                        <div className="inputField">
                            <label>{t('calc_year')}:</label>
                            <select value={year} onChange={(e) => setYear(e.target.value)}>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        {carType === 'main' ? (
                            <>
                                <div className="inputField">
                                    <label>{t('calc_engine_type')}:</label>
                                    <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                                        <option value="petrol">{t('calc_petrol_hybrid')}</option>
                                        <option value="diesel">{t('calc_diesel')}</option>
                                    </select>
                                </div>
                                <div className="inputField">
                                    <label>{t('calc_volume')} (см³):</label>
                                    <select value={engine} onChange={(e) => setEngine(e.target.value)}>
                                        {(fuel === 'petrol' ? petrolVolumes : dieselVolumes).map(opt => (
                                            <option key={opt} value={opt}>{opt} {t('calc_cm3')}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="inputField">
                                    <label>{t('calc_brand')}:</label>
                                    <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); }}>
                                        <option value="">{t('calc_select_brand')}</option>
                                        {Object.keys(premiumData).map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div className="inputField">
                                    <label>{t('calc_model')}:</label>
                                    <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
                                        <option value="">{brand ? t('calc_select_model') : t('calc_select_brand_first')}</option>
                                        {brand && premiumData[brand].map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="inputField">
                                    <label>{t('calc_volume')} (см³):</label>
                                    <select value={engine} onChange={(e) => setEngine(e.target.value)}>
                                        {engineOptions.map(opt => <option key={opt} value={opt}>{opt} {t('calc_cm3')}</option>)}
                                    </select>
                                </div>
                            </>
                        )}
                        <button className="calculateBtn" onClick={calculate}>{t('calc_button')}</button>
                    </div>

                    <div className="calcCard resultCard">
                        {result ? (
                            <div className="resultContent">
                                <div className="resLine">
                                    <span>{t('calc_avg_price')}:</span>
                                    <b className="grayValue">${result.basePrice.toLocaleString()}</b>
                                </div>
                                <div className="resLine">
                                    <span>{t('calc_tax_payment')}:</span>
                                    <b className="greenText">${result.tax.toLocaleString()}</b>
                                </div>
                                <div className="resLine">
                                    <span>{t('calc_shipping') || 'Доставка'}:</span>
                                    <b className="grayValue">${result.shipping.toLocaleString()}</b>
                                </div>
                                <div className="divider"></div>
                                <div className="resLine total">
                                    <span>{t('calc_total_key')}:</span>
                                    <b className="totalValue">${result.total.toLocaleString()}</b>
                                </div>
                                <p className="disclaimer">*{t('calc_disclaimer')}</p>
                            </div>
                        ) : (
                            <div className="emptyMsg">{t('calc_empty_msg')}</div>
                        )}
                    </div>
                </div>

                {carType === 'main' && (
                    <div className="tablesSection">
                        <div className="tableBlock">
                            <h2>{t('calc_table_petrol')}</h2>
                            <div className="legend">
                                <span className="legItem"><i className="dot gray"></i> {t('calc_legend_gray')}</span>
                                <span className="legItem"><i className="dot green"></i> {t('calc_legend_green')}</span>
                            </div>
                            <div className="tableWrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{t('calc_table_year_vol')}</th>
                                            {petrolVolumes.map(v => <th key={v}>{v}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {years.map(y => (
                                            <tr key={y}>
                                                <td>{y}</td>
                                                {petrolVolumes.map(v => <td key={v}>{renderCell(y, v)}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="tableBlock">
                            <h2>{t('calc_table_diesel')}</h2>
                            <div className="tableWrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{t('calc_table_year_vol')}</th>
                                            {dieselVolumes.map(v => <th key={v}>{v}</th>)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {years.map(y => (
                                            <tr key={y}>
                                                <td>{y}</td>
                                                {dieselVolumes.map(v => <td key={v}>{renderCell(y, v)}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <p className="tableNote">*{t('calc_table_note')}</p>
                    </div>
                )}
            </div>
        </div >
    );
};