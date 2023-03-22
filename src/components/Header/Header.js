import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logos/InStock-Logo.svg';

import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            
            <div className='logo'>
                <Link to={'/'}>
                    <img className="logo__img" src={logo} alt="instock-logo"/>
                </Link>
            </div>

            <div className='nav'>
                <NavLink className='nav__item' to={`/`}>Warehouse</NavLink>
                <NavLink className='nav__item' to={`/inventory`}>Inventory</NavLink>
            </div>
            
        </header>
    );
};

export default Header;