import React from "react";
import './Currency.scss'
import { ICurrency } from "@/interfaces/Currency";



const Currency: React.FC<{ currency: ICurrency }> = ({currency}) => {
    return (
        <div className={'Currency'}>
            <span className={'Currency__item Currency__item_txt'}>{currency.txt}</span>
            <div className={'Currency__line'}></div>
            <span className={'Currency__item Currency__item_cc'}>{currency.cc}</span>
            <div className={'Currency__line'}></div>
            <span className={'Currency__item Currency__item_rate'}>{currency.rate}</span>
            <div className={'Currency__line'}></div>
            <span className={'Currency__item Currency__item_date'}>{currency.exchangedate}</span>
        </div>
    )
}

export default Currency;