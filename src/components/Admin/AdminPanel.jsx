// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../api/supabaseClient';
// import { useNavigate } from 'react-router-dom';
// import AddCarForm from '../addCarForm/AddCarForm'; // Импортируем твою форму
// import './AdminPanel.css';

// export const AdminPanel = () => {
//     const [cars, setCars] = useState([]);
//     const [editingCar, setEditingCar] = useState(null); // Состояние для редактирования
//     const [loading, setLoading] = useState(true);
//     const [showAddForm, setShowAddForm] = useState(false); // Скрывать/показывать форму
//     const navigate = useNavigate();


//     // 1. ПРОВЕРКА АВТОРИЗАЦИИ + GET запрос (получение машин)
//     const fetchCars = async () => {
//         setLoading(true);

//         const { data: { session } } = await supabase.auth.getSession();

//         // Если не залогинен ВООБЩЕ или почта НЕ админская
//         if (!session || session.user.email !== 'admin_cabinet@alians.com') {
//             alert("У вас нет прав доступа к этой странице!");
//             navigate('/'); // Выкидываем на главную
//             return;
//         }

//         // Если всё ок — грузим машины
//         const { data, error } = await supabase
//             .from('car-cards')
//             .select('*')
//             .order('created_at', { ascending: false });

//         if (error) console.error('Ошибка:', error);
//         else setCars(data);
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchCars();
//     }, []);

//     const handleLogout = async () => {
//         await supabase.auth.signOut(); // Удаляет сессию из базы и браузера
//         navigate('/'); // Уходим на главную
//     };

//     if (loading) return <div>Загрузка...</div>;

//     // Функция для подготовки к редактированию
//     const handleEdit = (car) => {
//         setEditingCar(car);
//         setShowAddForm(true);
//         window.scrollTo({ top: 0, behavior: 'smooth' }); // Скролл к форме
//     };

//     // 2. Функция удаления
//     const handleDelete = async (car) => {
//         if (!window.confirm(`Удалить ${car.title}?`)) return;

//         try {
//             // Функция для получения имени файла из длинной ссылки Supabase
//             const getFileName = (url) => {
//                 if (!url) return null;
//                 const parts = url.split('/');
//                 return parts[parts.length - 1]; // Берем последнюю часть ссылки
//             };

//             // Собираем все файлы: главное фото + массив галереи
//             const filesToDelete = [
//                 getFileName(car.image),
//                 ...(car.images || []).map(getFileName)
//             ].filter(Boolean); // Убираем пустые значения

//             // 1. Сначала удаляем ФИЗИЧЕСКИЕ файлы из Storage
//             if (filesToDelete.length > 0) {
//                 await supabase.storage.from('car-images').remove(filesToDelete);
//             }

//             // 2. Только потом удаляем ЗАПИСЬ из базы данных
//             const { error } = await supabase.from('car-cards').delete().eq('id', car.id);

//             if (error) throw error;
//             setCars(prev => prev.filter(c => c.id !== car.id));
//         } catch (err) {
//             alert('Ошибка при полном удалении: ' + err.message);
//         }
//     };
//     if (loading) return <div className="admin-loader">Загрузка данных и проверка доступа...</div>;

//     // fepofiw
//     // gitfjpwjfwe

//     return (
//         <div className="admin-panel">
//             <header className="admin-header">
//                 <h1>Панель управления Alians</h1>
//                 <div className="admin-header-actions">
//                     <button className="add-car-btn" onClick={() => {
//                         if (showAddForm) {
//                             setEditingCar(null);
//                         }
//                         setShowAddForm(!showAddForm);
//                     }}>
//                         {showAddForm ? 'Закрыть форму' : '+ Добавить авто'}
//                     </button>
//                     <button onClick={handleLogout} className="logout-btn">
//                         Выйти
//                     </button>
//                 </div>
//             </header>

//             {showAddForm && (
//                 <div className="admin-form-wrapper">
//                     <AddCarForm
//                         editData={editingCar}
//                         onCarAdded={() => {
//                             fetchCars();
//                             setShowAddForm(false);
//                             setEditingCar(null);
//                         }}
//                     />
//                 </div>
//             )}

//             <div className="admin-table-container">
//                 <table className="admin-table">
//                     <thead>
//                         <tr>
//                             <th>Фото</th>
//                             <th>Марка/Модель</th>
//                             <th>Цена</th>
//                             <th>Год</th>
//                             <th>Действия</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cars.map(car => (
//                             <tr key={car.id}>
//                                 <td data-label="Фото">
//                                     <img src={car.image} alt="" className="admin-thumb" />
//                                 </td>
//                                 <td data-label="Авто">{car.brand} {car.title}</td>
//                                 <td data-label="Цена">${car.price?.toLocaleString()}</td>
//                                 <td data-label="Год">{car.year}</td>
//                                 <td data-label="Действия">
//                                     <div className="admin-actions">
//                                         <button className="edit-btn" onClick={() => handleEdit(car)}>
//                                             Изменить
//                                         </button>
//                                         <button className="del-btn" onClick={() => handleDelete(car)}>
//                                             Удалить
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };
import React, { useEffect, useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import { useNavigate } from 'react-router-dom';
import AddCarForm from '../addCarForm/AddCarForm';
import './AdminPanel.css';

export const AdminPanel = () => {
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const navigate = useNavigate();


    const sendPushNotification = async () => {
        // 1. ВСТАВЬ СЮДА СВОЙ SERVER KEY ИЗ FIREBASE (Settings -> Cloud Messaging)
        const FIREBASE_SERVER_KEY = 'AIzaSyDJciFDRXMa0uJYLvYVxqtyEG7xF3smb2A';

        // 2. Спрашиваем текст у админа
        const userMessage = window.prompt("Введите текст уведомления для всех клиентов:", "У нас новое поступление авто!");
        if (!userMessage || userMessage.trim() === "") return;

        try {
            // 3. Получаем ВСЕ токены из Supabase
            const { data: subscribers, error: dbError } = await supabase
                .from('push_subscriptions')
                .select('token');

            if (dbError) throw new Error("Ошибка получения подписчиков: " + dbError.message);
            if (!subscribers || subscribers.length === 0) {
                alert("В базе еще нет ни одного подписанного устройства!");
                return;
            }

            // Вытаскиваем только чистые токены в массив
            const tokens = subscribers.map(s => s.token).filter(Boolean);
            console.log(`Найдено получателей: ${tokens.length}`);

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const targetUrl = 'https://fcm.googleapis.com/fcm/send';

            const response = await fetch(proxyUrl + targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `key=${FIREBASE_SERVER_KEY}`,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({
                    registration_ids: tokens,
                    notification: {
                        title: "Alians Auto",
                        body: userMessage,
                        icon: "/logo192.png"
                    }
                })
            });
            const result = await response.json();

            if (response.ok) {
                alert(`Успешно!\nОтправлено: ${result.success}\nОшибок: ${result.failure}`);
            } else {
                throw new Error(result.error || "Ошибка при отправке через Firebase");
            }

        } catch (err) {
            console.error("Детальная ошибка рассылки:", err);
            alert("Ошибка рассылки: " + err.message);
        }
    };
    const fetchCars = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (!session || session.user.email !== 'admin_cabinet@alians.com') {
            alert("У вас нет прав доступа к этой странице!");
            navigate('/');
            return;
        }

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
        await supabase.auth.signOut();
        navigate('/');
    };

    const handleEdit = (car) => {
        setEditingCar(car);
        setShowAddForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (car) => {
        if (!window.confirm(`Удалить ${car.brand} ${car.title}?`)) return;

        try {
            // Функция для вычленения чистого пути к файлу из URL Supabase
            const getStoragePath = (url) => {
                if (!url) return null;
                // Ссылка выглядит так: .../storage/v1/object/public/car-images/123_main.jpg
                // Нам нужно все, что идет ПОСЛЕ названия бакета 'car-images/'
                const parts = url.split('car-images/');
                return parts.length > 1 ? parts[1] : null;
            };

            // Собираем пути всех файлов
            const mainPath = getStoragePath(car.image);
            const galleryPaths = (car.images || []).map(getStoragePath);

            // Объединяем в один массив и убираем null
            const allPathsToDelete = [mainPath, ...galleryPaths].filter(Boolean);

            console.log("Пытаемся удалить файлы из Storage:", allPathsToDelete);

            // 1. Сначала удаляем файлы из Storage
            if (allPathsToDelete.length > 0) {
                const { data, error: storageError } = await supabase
                    .storage
                    .from('car-images')
                    .remove(allPathsToDelete);

                if (storageError) {
                    console.error("Ошибка Storage:", storageError);
                    // Если не удалилось из облака, лучше остановить процесс
                    throw new Error("Не удалось удалить изображения из хранилища");
                }
                console.log("Результат удаления из Storage:", data);
            }

            // 2. И только если файлы удалены (или их не было), удаляем запись из базы
            const { error: dbError } = await supabase
                .from('car-cards')
                .delete()
                .eq('id', car.id);

            if (dbError) throw dbError;

            setCars(prev => prev.filter(c => c.id !== car.id));
            alert('Машина и все её фото успешно удалены!');

        } catch (err) {
            console.error("Полная ошибка удаления:", err);
            alert('Ошибка при удалении: ' + err.message);
        }
    };


    if (loading) return <div className="admin-loader">Загрузка данных...</div>;

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <h1>Панель управления Alians</h1>
                <div className="admin-header-actions">
                    {/* --- НОВАЯ КНОПКА РАССЫЛКИ --- */}
                    <button
                        className="push-btn"
                        onClick={sendPushNotification}
                        style={{ backgroundColor: '#ff9800', color: 'white', marginRight: '10px' }}
                    >
                        📢 Оповестить всех
                    </button>

                    <button className="add-car-btn" onClick={() => {
                        if (showAddForm) setEditingCar(null);
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
                                        <button className="edit-btn" onClick={() => handleEdit(car)}>Изменить</button>
                                        <button className="del-btn" onClick={() => handleDelete(car)}>Удалить</button>
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