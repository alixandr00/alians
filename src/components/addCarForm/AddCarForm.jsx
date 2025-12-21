import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../../api/supabaseClient';
import './AddCarForm.css'; // <-- Подключаем наш новый красивый CSS

const BRANDS_MODELS = {
    'Audi': ['A4', 'A6', 'Q5', 'Q7', 'e-tron'],
    'BMW': ['3 Series', '5 Series', 'X5', 'X7', 'iX'],
    'BYD': ['Han', 'Tang', 'Song', 'QinPlus', 'Seal'],
    'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X'],
    'Mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLE', 'EQS'],
    'Mazda': ['CX-5', 'CX-30', 'CX-9', 'Mazda 6'],
    'Chevrolet': ['Tahoe', 'Camaro', 'Malibu', 'Equinox'],
    'JAC': ['JS4', 'JS6', 'T8 Pro'],
    'Subaru': ['Forester', 'Outback', 'Impreza'],
    'Geely': ['Monjaro', 'Tugella', 'Coolray', 'Atlas'],
    'Chery': ['Tiggo 4', 'Tiggo 7 Pro', 'Tiggo 8 Pro'],
    'Zeekr': ['001', '009', 'X'],
    'Lada': ['Vesta', 'Granta', 'Niva Travel'],
    'Hyundai': ['Palisade', 'Santa Fe', 'Tucson', 'Elantra']
};

const INITIAL_STATE = {
    title: '', brand: '', price: '', year: '',
    transmission: 'Автомат', fuel: 'Бензин',
    mileage: '', description: '', specs: ''
};

export default function AddCarForm({ onCarAdded, editData }) {
    const [loading, setLoading] = useState(false);
    const [car, setCar] = useState(INITIAL_STATE);

    const [mainImage, setMainImage] = useState(null);
    const [existingMainImage, setExistingMainImage] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);
    const [existingGallery, setExistingGallery] = useState([]);

    // Ключ для полного сброса инпутов файлов
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
                specs: Array.isArray(editData.specs) ? editData.specs.join(', ') : ''
            });
            setExistingMainImage(editData.image || '');
            setExistingGallery(editData.images || []);
            setMainImage(null);
            setGalleryImages([]);
        } else {
            setCar(INITIAL_STATE);
            setExistingMainImage('');
            setExistingGallery([]);
            setMainImage(null);
            setGalleryImages([]);
            setInputKey(Date.now());
        }
    }, [editData]);

    const availableModels = useMemo(() => {
        return car.brand ? BRANDS_MODELS[car.brand] : [];
    }, [car.brand]);

    // Функция, чтобы при прокрутке страницы колесиком цифры в инпутах не менялись
    const handleWheel = (e) => {
        e.target.blur();
    };

    const removeGalleryImage = async (urlToRemove) => {
        if (!window.confirm('Удалить это фото?')) return;
        try {
            const fileName = urlToRemove.split('/').pop();
            await supabase.storage.from('car-images').remove([fileName]);
            setExistingGallery(prev => prev.filter(url => url !== urlToRemove));
        } catch (err) {
            console.error("Ошибка:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalMainImageUrl = existingMainImage;

            if (mainImage) {
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
                images: totalGallery
            };

            let result;
            if (editData) {
                result = await supabase.from('car-cards').update(carData).eq('id', editData.id);
            } else {
                result = await supabase.from('car-cards').insert([carData]);
            }

            if (result.error) throw result.error;

            alert(editData ? 'Данные обновлены!' : 'Автомобиль добавлен!');

            if (!editData) {
                setCar(INITIAL_STATE);
                setMainImage(null);
                setGalleryImages([]);
                setExistingMainImage('');
                setExistingGallery([]);
                setInputKey(Date.now());
            }

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
            </div>

            <div className="form-row three-col">
                <div className="form-group">
                    <label className="form-label">Цена ($)</label>
                    <input
                        type="number"
                        className="form-input"
                        value={car.price}
                        onChange={e => setCar({ ...car, price: e.target.value })}
                        onWheel={handleWheel} // ЗАЩИТА ОТ ПРОКРУТКИ
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Год</label>
                    <input
                        type="number"
                        className="form-input"
                        value={car.year}
                        onChange={e => setCar({ ...car, year: e.target.value })}
                        onWheel={handleWheel} // ЗАЩИТА ОТ ПРОКРУТКИ
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
                        onWheel={handleWheel} // ЗАЩИТА ОТ ПРОКРУТКИ
                        required
                    />
                </div>
            </div>

            <div className="form-row two-col">
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

            {/* БЛОК ФОТОГРАФИЙ */}
            <div className="photo-upload-section">
                <h4 className="section-subtitle">Фотографии</h4>

                {/* Главное фото */}
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

                {/* Галерея */}
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

            <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Сохранение...' : (editData ? 'Сохранить изменения' : 'Опубликовать авто')}
            </button>
        </form>
    );
}