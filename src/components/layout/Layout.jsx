import React from 'react'
import { Header } from '../header/Header'
import { Outlet } from 'react-router-dom'
import './Layout.css'

export const Layout = () => {
    return (
        <div>
            <Header />
            <main className='layout-main'>
                <Outlet />
            </main>
        </div>
    )
}
