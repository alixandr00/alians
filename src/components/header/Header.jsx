// src/components/Header/Header.jsx
import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import {
    IoSearchOutline,
    IoCallOutline,
    IoCheckmarkCircle,
    IoMenuOutline,
    IoCloseOutline
} from 'react-icons/io5';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="headerContainer">
            <div className="burgerButton" onClick={toggleMenu}>
                {isMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
            </div>

            <div className="logoBlock">
                <span className="logoIcon">{'<'}</span>
                <span className="logoText">Alians</span>
            </div>

            <div className={`navWrapper ${isMenuOpen ? 'active' : ''}`}>
                <div className="mobileMenuHeader">
                    <span className="logoText">Меню</span>
                    <IoCloseOutline className="closeMenuIcon" onClick={toggleMenu} />
                </div>

                <nav className="navMenu">
                    <Link to="/" className="navLink" onClick={() => setIsMenuOpen(false)}>Авто из Китая</Link>
                    <Link to="/catalog" className="navLink" onClick={() => setIsMenuOpen(false)}>Под заказ</Link>
                    <Link to="/contacts" className="navLink" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
                    <Link to="/faq" className="navLink" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
                    <Link to="/calculator" className="navLink" onClick={() => setIsMenuOpen(false)}>Калькулятор</Link>
                    <Link to="/auth" className="navLink" onClick={() => setIsMenuOpen(false)}>Вход</Link>
                </nav>

                <div className="contactSearchBlock">
                    <IoSearchOutline className="headerIcon searchIcon" />
                    <div className="phoneWrapper">
                        <IoCallOutline className="headerIcon phoneIcon" />
                        <input
                            type="number"
                            className="phoneNumberInput"
                            placeholder="+7(913)36-54-54"
                        />
                    </div>
                    <IoCheckmarkCircle className="statusIcon" />
                </div>
            </div>

            {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </header>
    );
};