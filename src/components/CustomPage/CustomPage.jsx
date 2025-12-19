import React, { useState } from 'react';
import './CustomPage.css';
import { customsRates } from '../../data/CarsData';

export const CustomsPage = () => {
    const [carType, setCarType] = useState('main');
    const [fuel, setFuel] = useState('petrol');
    const [engine, setEngine] = useState('2000');
    const [year, setYear] = useState('2024');
    const [result, setResult] = useState(null);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

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

        setResult({
            basePrice: baseAutoPrice,
            tax: tax,
            total: baseAutoPrice + tax + 1500
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

    // ОБНОВЛЕННЫЕ СПИСКИ ОБЪЕМОВ
    const petrolVolumes = ['1000', '1500', '1600', '1700', '1800', '2000', '2200', '2500', '3000', '3300', '3500', '4000', '4400', '4600', '5700', '6200'];
    const dieselVolumes = ['2000', '2200', '2500', '3000', '3300', '3500', '3800', '4000', '4500'];

    return (
        <div className="customsPage">
            <div className="customsContainer">
                <h1 className="mainTitle">Таможенный калькулятор</h1>

                <div className="typeTabsContainer">
                    <div className="typeTabs">
                        <button className={carType === 'main' ? 'active' : ''} onClick={() => { setCarType('main'); setResult(null); }}>Основной</button>
                        <button className={carType === 'premium' ? 'active' : ''} onClick={() => { setCarType('premium'); setResult(null); }}>Премиум авто</button>
                    </div>
                </div>

                <div className="calcGrid">
                    <div className="calcCard inputCard">
                        <div className="inputField">
                            <label>Год выпуска:</label>
                            <select value={year} onChange={(e) => setYear(e.target.value)}>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        {carType === 'main' ? (
                            <>
                                <div className="inputField">
                                    <label>Тип двигателя:</label>
                                    <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                                        <option value="petrol">Бензин / Гибрид</option>
                                        <option value="diesel">Дизель</option>
                                    </select>
                                </div>
                                <div className="inputField">
                                    <label>Объем (см³):</label>
                                    <select value={engine} onChange={(e) => setEngine(e.target.value)}>
                                        {(fuel === 'petrol' ? petrolVolumes : dieselVolumes).map(opt => (
                                            <option key={opt} value={opt}>{opt} см³</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="inputField">
                                    <label>Марка:</label>
                                    <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); }}>
                                        <option value="">Выберите марку</option>
                                        {Object.keys(premiumData).map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div className="inputField">
                                    <label>Модель:</label>
                                    <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
                                        <option value="">{brand ? 'Выберите модель' : 'Выберите марку'}</option>
                                        {brand && premiumData[brand].map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="inputField">
                                    <label>Объем (см³):</label>
                                    <select value={engine} onChange={(e) => setEngine(e.target.value)}>
                                        {engineOptions.map(opt => <option key={opt} value={opt}>{opt} см³</option>)}
                                    </select>
                                </div>
                            </>
                        )}
                        <button className="calculateBtn" onClick={calculate}>Рассчитать стоимость</button>
                    </div>

                    <div className="calcCard resultCard">
                        {result ? (
                            <div className="resultContent">
                                <div className="resLine">
                                    <span>Средняя цена авто:</span>
                                    <b className="grayValue">${result.basePrice.toLocaleString()}</b>
                                </div>
                                <div className="resLine">
                                    <span>Таможенный платеж:</span>
                                    <b className="greenText">${result.tax.toLocaleString()}</b>
                                </div>
                                <div className="divider"></div>
                                <div className="resLine total">
                                    <span>Итого под ключ:</span>
                                    <b className="totalValue">${result.total.toLocaleString()}</b>
                                </div>
                                <p className="disclaimer">*В итоговую сумму включены: цена авто, пошлина, доставка и оформление ($1500)</p>
                            </div>
                        ) : (
                            <div className="emptyMsg">Заполните данные для получения расчета по статистике</div>
                        )}
                    </div>
                </div>
                {carType === 'main' && (
                    <div className="tablesSection">
                        <div className="tableBlock">
                            <h2>Таблица: Бензин / Гибрид</h2>
                            <div className="legend">
                                <span className="legItem"><i className="dot gray"></i> Серый цвет — средняя стоимость авто</span>
                                <span className="legItem"><i className="dot green"></i> Зеленый цвет — таможенный платеж</span>
                            </div>
                            <div className="tableWrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Год \ см³</th>
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
                            <h2>Таблица: Дизель</h2>
                            <div className="tableWrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Год \ см³</th>
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
                        <p className="tableNote">*Все цены указаны в USD. Статистика основана на последних аукционах.</p>
                    </div>
                )}
            </div>
        </div>
    );
};