import React from 'react'
import { Header } from '../header/Header'
import { Outlet } from 'react-router-dom'
import './Layout.css'

export const Layout = ({ searchTerm, setSearchTerm }) => {
    return (
        <div>
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <main className='layout-main'>
                <Outlet />
            </main>
        </div>
    )
}
