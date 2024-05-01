import React from 'react'
import ParrotIcon from './assets/parrot.png'
export default function Header() {
    return (
        <header>
            <img src={ParrotIcon} />
            <div className="header-title">
                <h1>PollyGlot</h1>
                <p>Perfect Translation Every Time</p>
            </div>
        </header>
    )
}