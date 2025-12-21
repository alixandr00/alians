import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import { useNavigate } from 'react-router-dom';
import AddCarForm from '../addCarForm/AddCarForm'; // Импортируем твою форму
import './AdminPanel.css';

export const AdminPanel = () => {
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null); // Состояние для редактирования
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false); // Скрывать/показывать форму
    const navigate = useNavigate();


    // 1. ПРОВЕРКА АВТОРИЗАЦИИ + GET запрос (получение машин)
    const fetchCars = async () => {
        setLoading(true);

        const { data: { session } } = await supabase.auth.getSession();

        // Если не залогинен ВООБЩЕ или почта НЕ админская
        if (!session || session.user.email !== 'admin_cabinet@alians.com') {
            alert("У вас нет прав доступа к этой странице!");
            navigate('/'); // Выкидываем на главную
            return;
        }

        // Если всё ок — грузим машины
        const { data, error } = await supabase
            .from('car-cards')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Ошибка:', error);
        else setCars(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut(); // Удаляет сессию из базы и браузера
        navigate('/'); // Уходим на главную
    };

    if (loading) return <div>Загрузка...</div>;

    // Функция для подготовки к редактированию
    const handleEdit = (car) => {
        setEditingCar(car);
        setShowAddForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Скролл к форме
    };

    // 2. Функция удаления
    const handleDelete = async (car) => {
        if (!window.confirm(`Удалить ${car.title}?`)) return;

        try {
            // Функция для получения имени файла из длинной ссылки Supabase
            const getFileName = (url) => {
                if (!url) return null;
                const parts = url.split('/');
                return parts[parts.length - 1]; // Берем последнюю часть ссылки
            };

            // Собираем все файлы: главное фото + массив галереи
            const filesToDelete = [
                getFileName(car.image),
                ...(car.images || []).map(getFileName)
            ].filter(Boolean); // Убираем пустые значения

            // 1. Сначала удаляем ФИЗИЧЕСКИЕ файлы из Storage
            if (filesToDelete.length > 0) {
                await supabase.storage.from('car-images').remove(filesToDelete);
            }

            // 2. Только потом удаляем ЗАПИСЬ из базы данных
            const { error } = await supabase.from('car-cards').delete().eq('id', car.id);

            if (error) throw error;
            setCars(prev => prev.filter(c => c.id !== car.id));
        } catch (err) {
            alert('Ошибка при полном удалении: ' + err.message);
        }
    };
    if (loading) return <div className="admin-loader">Загрузка данных и проверка доступа...</div>;

    // fepofiw
    // gitfjpwjfwe

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <h1>Панель управления Alians</h1>
                <div className="admin-header-actions">
                    <button className="add-car-btn" onClick={() => {
                        if (showAddForm) {
                            setEditingCar(null);
                        }
                        setShowAddForm(!showAddForm);
                    }}>
                        {showAddForm ? 'Закрыть форму' : '+ Добавить авто'}
                    </button>
                    <button onClick={handleLogout} className="logout-btn">
                        Выйти
                    </button>
                </div>
            </header>

            {showAddForm && (
                <div className="admin-form-wrapper">
                    <AddCarForm
                        editData={editingCar}
                        onCarAdded={() => {
                            fetchCars();
                            setShowAddForm(false);
                            setEditingCar(null);
                        }}
                    />
                </div>
            )}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>Марка/Модель</th>
                            <th>Цена</th>
                            <th>Год</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td data-label="Фото">
                                    <img src={car.image} alt="" className="admin-thumb" />
                                </td>
                                <td data-label="Авто">{car.brand} {car.title}</td>
                                <td data-label="Цена">${car.price?.toLocaleString()}</td>
                                <td data-label="Год">{car.year}</td>
                                <td data-label="Действия">
                                    <div className="admin-actions">
                                        <button className="edit-btn" onClick={() => handleEdit(car)}>
                                            Изменить
                                        </button>
                                        <button className="del-btn" onClick={() => handleDelete(car)}>
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};