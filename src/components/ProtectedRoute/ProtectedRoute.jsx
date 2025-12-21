import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';

export const ProtectedRoute = () => {
    const [session, setSession] = useState(undefined);

    useEffect(() => {
        // Проверяем сессию при загрузке
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Слушаем изменения (если нажмем Выход, сессия станет null)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Пока идет проверка, не рендерим ничего
    if (session === undefined) return null;

    // Если сессия есть — показываем контент (Outlet), если нет — редирект
    return session ? <Outlet /> : <Navigate to="/auth" replace />;
};