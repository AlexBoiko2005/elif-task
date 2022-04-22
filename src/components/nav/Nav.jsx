import React from 'react'
import './Nav.css'

const Nav = ({page, setPage}) => {
    return (
        <nav className='bank-nav'>
            <ul>
                <li onClick={() => {setPage('addBank')}} >Add Bank</li>
                <li onClick={() => {setPage('calcMort')}} >Calculate Mortgage</li>
            </ul>
        </nav>
    )
}

export default Nav