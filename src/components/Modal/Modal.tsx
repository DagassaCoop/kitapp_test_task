import React from "react";
import './Modal.scss'
import {useState} from "react";
import { useAppSelector } from "hooks/storeHooks";
import { ICurrency } from "@/interfaces/Currency";
import uuid from 'react-uuid'

const closeIcon = require('assets/close.png');


interface IProps {
    active: boolean;
    setActive: (active: boolean) => void;
}

const Modal: React.FC<IProps> = ({active, setActive}) => {

    const currencies: ICurrency[] = useAppSelector(state => state.app.currencies)

    const buttonCloseHandler = () => {
        setActive(false);
    }

    return (
        <div className={
            active 
                ? 'Modal'
                : 'Modal hide'
        }>
            <div className={'Modal__content'}>
                <h2 className={'Modal__content-title'}>Доступні валюти</h2>
                <div className={'Modal__content-list'}>
                    {currencies.map(currency => {
                        return (
                            <span key={uuid()} className={'Modal__content-list-item'}>{currency.txt} (<strong>{currency.cc}</strong>)</span>
                        )
                    })}
                </div>
                <button onClick={() => buttonCloseHandler()} className={'Modal__content-close'}>
                    <img className={'Modal__content-close-icon'} src={closeIcon} alt="close"/>
                </button>
            </div>
        </div>
    )
}

export default Modal;