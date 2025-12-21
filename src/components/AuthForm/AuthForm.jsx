import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient'; // ПРОВЕРЬ ПУТЬ К КЛИЕНТУ
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true); // По умолчанию лучше ставить вход
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isLogin) {
            // 1. Пытаемся войти
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert("Ошибка входа: " + error.message);
                setLoading(false);
                return;
            }

            // 2. Проверяем, кто зашел
            if (email === 'admin_cabinet@alians.com') {
                alert("Добро пожаловать, Босс! Переходим в админку.");
                navigate('/admin-panel'); // Админа — в панель
            } else {
                alert("Успешный вход! Рады вас видеть.");
                navigate('/'); // Обычного юзера — на главную
            }

        } else {
            // ЛОГИКА РЕГИСТРАЦИИ
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: userName } },
            });

            if (error) {
                alert("Ошибка регистрации: " + error.message);
            } else {
                alert("Регистрация успешна! Теперь вы можете войти в свой аккаунт.");
                setIsLogin(true); // Переключаем на вход, чтобы юзер залогинился
            }
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className={`auth-card ${isLogin ? 'login-mode' : 'reg-mode'}`}>
                <h2>{isLogin ? 'Войти' : 'Регистрация'}</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Имя</label>
                            <input
                                type="text"
                                placeholder="Введите имя"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label>Электронная почта</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="main-button" disabled={loading}>
                        {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Создать аккаунт')}
                    </button>
                </form>

                <div className="toggle-container">
                    <span>
                        {isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
                    </span>
                    <button
                        className="toggle-button"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </div>
            </div>
        </div>
    );
};