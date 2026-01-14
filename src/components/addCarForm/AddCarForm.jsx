import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import './AddCarForm.css';
import { BRANDS_MODELS, BRAND_ENGINES, COLORS_DATA } from '../../data/CarsData';

// 1. Опции, сгруппированные по категориям (как на Mashina.kg)
const CAR_OPTIONS_GROUPS = {
    "Безопасность": [
        "ABS", "ESP", "Подушка безопасности водителя", "Подушки безопасности боковые",
        "Датчик давления в шинах", "Иммобилайзер", "Сигнализация", "Центральный замок"
    ],
    "Комфорт": [
        "Кондиционер", "Климат-контроль", "Круиз-контроль", "Камера 360°",
        "Камера заднего вида", "Парктроники", "Электростеклоподъемники",
        "Подогрев сидений", "Датчик дождя", "Бесключевой доступ"
    ],
    "Салон": [
        "Кожа", "Алькантара", "Люк", "Панорамная крыша", "Мультируль",
        "Тонировка", "Подогрев руля", "Вентиляция сидений"
    ],
    "Мультимедиа": [
        "Apple CarPlay", "Android Auto", "Bluetooth", "Навигация", "Премиальная акустика"
    ],
    "Обзор": [
        "Ксенон", "Светодиодные фары", "Противотуманные фары", "Омыватель фар", "Адаптивное освещение"
    ]
};

const INITIAL_STATE = {
    title: '', brand: '', price: '', year: '',
    transmission: 'Автомат', fuel: 'Бензин', engine: '',
    mileage: '', description: '', specs: [], // Теперь это массив
    color: 'white', country: ''
};

const COUNTRIES_OPTIONS = [
    { id: 'kgz', label: 'Кыргызстан' },
    { id: 'china', label: 'Китай' },
    { id: 'korea', label: 'Корея' },
    { id: 'georgia', label: 'Грузия' },
    { id: 'dubai', label: 'Дубай' },
    { id: 'usa', label: 'Америка' },
];

export default function AddCarForm({ onCarAdded, editData }) {
    const [loading, setLoading] = useState(false);
    const [car, setCar] = useState(INITIAL_STATE);
    const [isPopular, setIsPopular] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [existingMainImage, setExistingMainImage] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const [existingGallery, setExistingGallery] = useState([]);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [inputKey, setInputKey] = useState(Date.now());

    useEffect(() => {
        if (editData) {
            setCar({
                brand: editData.brand || '',
                title: editData.title.replace(editData.brand, '').trim(),
                price: editData.price || '',
                year: editData.year || '',
                engine: editData.engine || '',
                transmission: editData.transmission || 'Автомат',
                fuel: editData.fuel || 'Бензин',
                mileage: editData.mileage || '',
                description: editData.description || '',
                color: editData.color || 'white',
                // Исправлено: преобразуем в массив, если в базе вдруг строка
                specs: Array.isArray(editData.specs) ? editData.specs : [],
                country: editData.country || ''
            });
            setExistingMainImage(editData.image || '');
            setExistingGallery(editData.images || []);
            setMainImage(null);
            setGalleryImages([]);
            setIsPopular(editData.is_popular || false);
        } else {
            setCar(INITIAL_STATE);
            setExistingMainImage('');
            setExistingGallery([]);
            setMainImage(null);
            setGalleryImages([]);
            setInputKey(Date.now());
            setIsPopular(false);
        }
    }, [editData]);

    const availableModels = useMemo(() => {
        if (!car.brand || !BRANDS_MODELS) return [];
        const models = BRANDS_MODELS[car.brand];
        return Array.isArray(models) ? models : [];
    }, [car.brand]);

    const availableEngines = useMemo(() => {
        if (!car.brand || !BRAND_ENGINES) return [];
        const engines = BRAND_ENGINES[car.brand] || BRAND_ENGINES['Default'] || [];
        return Array.isArray(engines) ? engines : [];
    }, [car.brand]);

    const handleWheel = (e) => {
        e.target.blur();
    };

    // Функция для работы с чекбоксами комплектации
    const handleOptionToggle = (optionName) => {
        setCar(prev => {
            const currentSpecs = Array.isArray(prev.specs) ? prev.specs : [];
            if (currentSpecs.includes(optionName)) {
                return { ...prev, specs: currentSpecs.filter(opt => opt !== optionName) };
            } else {
                return { ...prev, specs: [...currentSpecs, optionName] };
            }
        });
    };

    const removeGalleryImage = async (urlToRemove) => {
        if (!window.confirm('Удалить это фото навсегда?')) return;
        try {
            const fileName = urlToRemove.split('car-images/').pop();
            const { error } = await supabase.storage.from('car-images').remove([fileName]);
            if (error) throw error;
            setExistingGallery(prev => prev.filter(url => url !== urlToRemove));
        } catch (err) {
            console.error("Ошибка при удалении фото галереи:", err);
            alert("Не удалось удалить файл из облака");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!car.country) {
            alert("Пожалуйста, выберите страну происхождения авто!");
            return;
        }

        setLoading(true);

        try {
            let finalMainImageUrl = existingMainImage;

            if (mainImage) {
                if (existingMainImage) {
                    const oldFileName = existingMainImage.split('/').pop();
                    await supabase.storage.from('car-images').remove([oldFileName]);
                }

                const mainExt = mainImage.name.split('.').pop();
                const mainPath = `${Date.now()}_main.${mainExt}`;
                const { error: mainErr } = await supabase.storage.from('car-images').upload(mainPath, mainImage);
                if (mainErr) throw mainErr;

                const { data: mainUrl } = supabase.storage.from('car-images').getPublicUrl(mainPath);
                finalMainImageUrl = mainUrl.publicUrl;
            }

            const newGalleryUrls = [];
            for (const file of galleryImages) {
                const ext = file.name.split('.').pop();
                const path = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
                const { error: galleryErr } = await supabase.storage.from('car-images').upload(path, file);
                if (!galleryErr) {
                    const { data: url } = supabase.storage.from('car-images').getPublicUrl(path);
                    newGalleryUrls.push(url.publicUrl);
                }
            }

            const totalGallery = [...existingGallery, ...newGalleryUrls];

            const carData = {
                title: `${car.brand} ${car.title}`,
                brand: car.brand,
                price: Number(car.price),
                year: Number(car.year),
                engine: car.engine,
                mileage: Number(car.mileage),
                fuel: car.fuel,
                transmission: car.transmission,
                description: car.description,
                image: finalMainImageUrl,
                specs: car.specs, // Это уже массив строк
                is_popular: isPopular,
                images: totalGallery,
                color: car.color,
                country: car.country
            };

            let result;
            if (editData) {
                result = await supabase.from('car-cards').update(carData).eq('id', editData.id);
            } else {
                result = await supabase.from('car-cards').insert([carData]);
            }

            if (result.error) throw result.error;

            alert(editData ? 'Данные обновлены!' : 'Автомобиль добавлен!');
            if (onCarAdded) onCarAdded();

        } catch (error) {
            alert('Ошибка: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form-container">
            <h2 className="form-title">{editData ? `Редактирование: ${editData.title}` : 'Новый автомобиль'}</h2>

            <div className="form-row two-col">
                <div className="form-group">
                    <label className="form-label">Страна происхождения</label>
                    <select
                        className="form-select"
                        value={car.country}
                        onChange={e => setCar({ ...car, country: e.target.value })}
                        required
                    >
                        <option value="">Выберите страну...</option>
                        {COUNTRIES_OPTIONS.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Марка</label>
                    <select
                        className="form-select"
                        value={car.brand}
                        onChange={e => setCar({ ...car, brand: e.target.value, title: '', engine: '' })}
                        required
                    >
                        <option value="">Выберите марку</option>
                        {Object.keys(BRANDS_MODELS).sort().map(brandName => (
                            <option key={brandName} value={brandName}>{brandName}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row three-col">
                <div className="form-group">
                    <label className="form-label">Модель</label>
                    <select
                        className="form-select"
                        value={car.title}
                        onChange={e => setCar({ ...car, title: e.target.value })}
                        required
                        disabled={!car.brand}
                    >
                        <option value="">{car.brand ? "Выберите модель" : "Сначала марку"}</option>
                        {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Объем двигателя</label>
                    <select
                        className="form-select"
                        value={car.engine}
                        onChange={e => setCar({ ...car, engine: e.target.value })}
                        required={car.fuel !== 'Электро'}
                        disabled={!car.brand}
                    >
                        <option value="">Выберите объем</option>
                        {availableEngines.map((val, index) => (
                            <option key={`${val}-${index}`} value={val}>
                                {val === '0' || val === 0 ? 'Электро' : `${val} л.`}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Цена ($)</label>
                    <input
                        type="number"
                        className="form-input"
                        value={car.price}
                        onChange={e => setCar({ ...car, price: e.target.value })}
                        onWheel={handleWheel}
                        required
                    />
                </div>
            </div>

            <div className="form-row three-col">
                <div className="form-group">
                    <label className="form-label">Год</label>
                    <input
                        type="number"
                        className="form-input"
                        value={car.year}
                        onChange={e => setCar({ ...car, year: e.target.value })}
                        onWheel={handleWheel}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Пробег (км)</label>
                    <input
                        type="number"
                        className="form-input"
                        value={car.mileage}
                        onChange={e => setCar({ ...car, mileage: e.target.value })}
                        onWheel={handleWheel}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Топливо</label>
                    <select
                        className="form-select"
                        value={car.fuel}
                        onChange={e => setCar({ ...car, fuel: e.target.value })}
                    >
                        <option value="Бензин">Бензин</option>
                        <option value="Электро">Электро</option>
                        <option value="Гибрид">Гибрид</option>
                        <option value="Дизель">Дизель</option>
                    </select>
                </div>
            </div>

            <div className="form-row two-col">
                <div className="form-group">
                    <label className="form-label">Коробка</label>
                    <select
                        className="form-select"
                        value={car.transmission}
                        onChange={e => setCar({ ...car, transmission: e.target.value })}
                    >
                        <option value="Автомат">Автомат</option>
                        <option value="Механика">Механика</option>
                        <option value="Робот">Робот</option>
                        <option value="Вариатор">Вариатор</option>
                    </select>
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                    <label className="form-label">Цвет автомобиля</label>
                    <div
                        className="form-select"
                        onClick={() => setIsColorOpen(!isColorOpen)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: '#fff' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: COLORS_DATA.find(c => c.id === car.color)?.hex || '#fff', border: '1px solid #ccc' }} />
                            <span>{COLORS_DATA.find(c => c.id === car.color)?.name || 'Выберите цвет'}</span>
                        </div>
                        <span style={{ transform: isColorOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}>▼</span>
                    </div>
                    {isColorOpen && (
                        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: '#fff', border: '1px solid #ddd', borderRadius: '8px', marginTop: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', maxHeight: '250px', overflowY: 'auto', padding: '8px' }}>
                            {COLORS_DATA.map(c => (
                                <div key={c.id} onClick={() => { setCar({ ...car, color: c.id }); setIsColorOpen(false); }} className="color-option-item">
                                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: c.hex, border: '1px solid #ddd' }} />
                                    <span style={{ flex: 1, fontSize: '14px' }}>{c.name}</span>
                                    {car.color === c.id && <span style={{ color: '#007bff' }}>✓</span>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Описание</label>
                <textarea
                    className="form-textarea"
                    value={car.description}
                    onChange={e => setCar({ ...car, description: e.target.value })}
                />
            </div>

            {/* НОВАЯ СЕКЦИЯ: КОМПЛЕКТАЦИЯ ЧЕКБОКСАМИ (Mashina.kg Style) */}
            <div className="specs-section">
                <h3 className="section-subtitle">Комплектация</h3>
                {Object.entries(CAR_OPTIONS_GROUPS).map(([groupName, options]) => (
                    <div key={groupName} className="specs-group">
                        <h4 className="specs-group-title">{groupName}</h4>
                        <div className="specs-grid">
                            {options.map(option => (
                                <label key={option} className="spec-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={car.specs.includes(option)}
                                        onChange={() => handleOptionToggle(option)}
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="photo-upload-section">
                <h4 className="section-subtitle">Фотографии</h4>
                <div className="main-photo-preview">
                    {existingMainImage && (
                        <div style={{ textAlign: 'center' }}>
                            <img src={existingMainImage} alt="Cover" className="preview-thumb" />
                            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Обложка</div>
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        <label className="form-label">Главное фото (Обложка)</label>
                        <input
                            key={inputKey}
                            type="file"
                            className="form-input"
                            style={{ background: '#fff' }}
                            accept="image/*"
                            onChange={e => setMainImage(e.target.files[0])}
                            required={!editData}
                        />
                    </div>
                </div>

                <div>
                    <label className="form-label">Галерея</label>
                    {existingGallery.length > 0 && (
                        <div className="gallery-grid">
                            {existingGallery.map((url, index) => (
                                <div key={index} className="gallery-item">
                                    <img src={url} alt="" className="gallery-thumb" />
                                    <button type="button" onClick={() => removeGalleryImage(url)} className="remove-photo-btn">×</button>
                                </div>
                            ))}
                        </div>
                    )}
                    <label className="file-input-help">Добавить дополнительные фото:</label>
                    <input
                        key={inputKey + 1}
                        type="file"
                        className="form-input"
                        style={{ background: '#fff' }}
                        accept="image/*"
                        multiple
                        onChange={e => setGalleryImages(Array.from(e.target.files))}
                    />
                </div>
            </div>

            <label className="checkbox-label">
                <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                />
                Добавить в популярные
            </label>

            <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Сохранение...' : (editData ? 'Сохранить изменения' : 'Опубликовать авто')}
            </button>
        </form>
    );
}