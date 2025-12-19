import React, { useState } from 'react';
import './AuthForm.css';

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className="auth-container">
            <div className={`auth-card ${isLogin ? 'login-mode' : 'reg-mode'}`}>
                <h2>{isLogin ? 'Войти' : 'Регистрация'}</h2>

                <form className="auth-form">
                    {!isLogin && (
                        <div className="input-group">
                            <label>Имя</label>
                            <input type="text" placeholder="Введите имя" />
                        </div>
                    )}

                    <div className="input-group">
                        <label>Электронная почта</label>
                        <input type="email" placeholder="example@mail.com" />
                    </div>

                    <div className="input-group">
                        <label>Пароль</label>
                        <input type="password" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="main-button">
                        {isLogin ? 'Войти' : 'Создать аккаунт'}
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
