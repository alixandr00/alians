import React, { useState } from 'react';
import { supabase } from '../../api/supabaseClient';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';
import { useTranslation } from 'react-i18next'; // Импорт

export const AuthForm = () => {
    const { t } = useTranslation(); // Инициализация
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                alert(t('auth_error_login') + ": " + error.message);
                setLoading(false);
                return;
            }

            if (email === 'admin_cabinet@alians.com') {
                alert(t('auth_welcome_admin'));
                navigate('/admin-panel');
            } else {
                alert(t('auth_welcome_user'));
                navigate('/');
            }

        } else {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { full_name: userName } },
            });

            if (error) {
                alert(t('auth_error_reg') + ": " + error.message);
            } else {
                alert(t('auth_success_reg'));
                setIsLogin(true);
            }
        }
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className={`auth-card ${isLogin ? 'login-mode' : 'reg-mode'}`}>
                <h2>{isLogin ? t('auth_login_title') : t('auth_reg_title')}</h2>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>{t('form_label_name')}</label>
                            <input
                                type="text"
                                placeholder={t('auth_placeholder_name')}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label>{t('auth_label_email')}</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>{t('auth_label_password')}</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="main-button" disabled={loading}>
                        {loading ? t('loading') : (isLogin ? t('auth_btn_login') : t('auth_btn_create'))}
                    </button>
                </form>

                <div className="toggle-container">
                    <span>
                        {isLogin ? t('auth_no_account') : t('auth_have_account')}
                    </span>
                    <button
                        className="toggle-button"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? t('auth_reg_link') : t('auth_login_link')}
                    </button>
                </div>
            </div>
        </div>
    );
};