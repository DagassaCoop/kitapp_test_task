import React, { useState } from "react";
import './Navigation.scss'
import Link from "components/Navigation/Link/Link";
import { NavLink } from "react-router-dom";

const logo = require('assets/logo.png');
const linkIconConverter = require('assets/converter.png')
const linkIconCurrencies = require('assets/currencies.png')


const Navigation: React.FC = () => {

    const [navIsOpen, setNavIsOpen] = useState<boolean>(false);

    const buttonHandler = () => {
        setNavIsOpen(prev => !prev);
    }


    return (
        <div className={
            navIsOpen
                ? 'Navigation Navigation_open'
                : 'Navigation'
        }>
            <button onClick={() => buttonHandler()}
                    className={
                        navIsOpen
                            ? 'Navigation__button hamburger hamburger--3dx is-active'
                            : 'Navigation__button hamburger hamburger--3dx'
                    }
                    type={'button'}
            >
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
            <div className={'Navigation__content'}>
                <NavLink className={'Navigation__logo'} to={'/'}>
                    <img className={'Navigation__logo-icon'} src={logo} alt="Logo"/>
                </NavLink>
                <div className={'Navigation__links'}>
                    <Link to={'converter'} title={'Конвертер'} icon={linkIconConverter}/>
                    <Link to={'currencies'} title={'Валюти'} icon={linkIconCurrencies}/>
                </div>
            </div>
        </div>
    )
}

export default Navigation;