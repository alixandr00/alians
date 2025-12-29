import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import './AddCarForm.css';
import { BRANDS_MODELS } from '../../data/CarsData';

// 1. Добавляем поле country в начальное состояние
const INITIAL_STATE = {
    title: '', brand: '', price: '', year: '',
    transmission: 'Автомат', fuel: 'Бензин',
    mileage: '', description: '', specs: '', color: 'white',
    country: '' // Новое поле
};

// Список стран для селекта (ID должны совпадать с теми, что мы делали в Header)
const COUNTRIES_OPTIONS = [
    { id: 'china', label: 'Китай' },
    { id: 'korea', label: 'Корея' },
    { id: 'georgia', label: 'Грузия' },
    { id: 'dubai', label: 'Дубай' },
    { id: 'usa', label: 'Америка' }
];

export default function AddCarForm({ onCarAdded, editData }) {
    const [loading, setLoading] = useState(false);
    const [car, setCar] = useState(INITIAL_STATE);
    const [isPopular, setIsPopular] = useState(false);
    const [mainImage, setMainImage] = useState(null);
    const [existingMainImage, setExistingMainImage] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const [existingGallery, setExistingGallery] = useState([]);

    const [inputKey, setInputKey] = useState(Date.now());

    useEffect(() => {
        if (editData) {
            setCar({
                brand: editData.brand || '',
                title: editData.title.replace(editData.brand, '').trim(),
                price: editData.price || '',
                year: editData.year || '',
                transmission: editData.transmission || 'Автомат',
                fuel: editData.fuel || 'Бензин',
                mileage: editData.mileage || '',
                description: editData.description || '',
                color: editData.color || 'white',
                specs: Array.isArray(editData.specs) ? editData.specs.join(', ') : '',
                country: editData.country || '' // 2. Загружаем страну при редактировании
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
        return car.brand ? BRANDS_MODELS[car.brand] : [];
    }, [car.brand]);

    const handleWheel = (e) => {
        e.target.blur();
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

        // Проверка: выбрана ли страна
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
                mileage: Number(car.mileage),
                fuel: car.fuel,
                transmission: car.transmission,
                description: car.description,
                image: finalMainImageUrl,
                specs: car.specs ? car.specs.split(',').map(s => s.trim()) : [],
                is_popular: isPopular,
                images: totalGallery,
                color: car.color,
                country: car.country // 3. Отправляем страну в базу
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
                {/* 4. НОВЫЙ СЕЛЕКТ ДЛЯ СТРАНЫ */}
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
                        onChange={e => setCar({ ...car, brand: e.target.value, title: '' })}
                        required
                    >
                        <option value="">Выберите марку</option>
                        {Object.keys(BRANDS_MODELS).sort().map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>
            </div>

            <div className="form-row two-col">
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
                    </select>
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

            <div className="form-group" style={{ marginTop: '15px' }}>
                <label className="form-label">Опции (через запятую)</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Пример: Панорама, Кожа, 360 камера"
                    value={car.specs}
                    onChange={e => setCar({ ...car, specs: e.target.value })}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Цвет автомобиля</label>
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
                    {[
                        { id: 'white', hex: '#FFFFFF', name: 'Белый' },
                        { id: 'black', hex: '#000000', name: 'Черный' },
                        { id: 'silver', hex: '#C0C0C0', name: 'Серебро' },
                        { id: 'blue', hex: '#2196F3', name: 'Синий' },
                        { id: 'red', hex: '#F44336', name: 'Красный' },
                        { id: 'green', hex: '#4CAF50', name: 'Зеленый' }
                    ].map(c => (
                        <div
                            key={c.id}
                            onClick={() => setCar({ ...car, color: c.id })}
                            style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                backgroundColor: c.hex,
                                border: car.color === c.id ? '3px solid #007bff' : '1px solid #ddd',
                                cursor: 'pointer',
                                transition: '0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title={c.name}
                        >
                            {car.color === c.id && (
                                <span style={{ color: c.id === 'white' ? '#000' : '#fff', fontSize: '14px' }}>✓</span>
                            )}
                        </div>
                    ))}
                </div>
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