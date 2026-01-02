import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './FAQ.css'; // Импортируем стили

export const FAQ = () => {
    const { t, i18n } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
    const isRTL = i18n.language === 'ar';
    const questions = t('faq.questions', { returnObjects: true });

    return (
        <div className={`faq-container ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="faq-title">{t('faq.title')}</h2>

            <div className="faq-list">
                {Array.isArray(questions) && questions.map((question, index) => (
                    <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
                        <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                            <span>{question}</span>
                            <svg className="chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>
                        <div className="faq-answer">
                            <div className="answer-content">
                                {/* Место для будущего текста ответа */}
                                Здесь будет информация о процессе...
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="whatsapp-wrapper">
                <a href="https://wa.me/yournumber" className="whatsapp-btn">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="wa" />
                    <span>WhatsApp</span>
                </a>
            </div>
        </div>
    );
};