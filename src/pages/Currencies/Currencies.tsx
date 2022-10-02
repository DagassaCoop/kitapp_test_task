import React, { useState, useEffect } from "react";
import './Currencies.scss'
import {getCurrencies} from "store/slices/appSlice";
import {ICurrency} from "interfaces/Currency";
import {useAppDispatch, useAppSelector} from "hooks/storeHooks";
import uuid from "react-uuid";
import Currency from "pages/Currencies/Currency/Currency";

const Currencies: React.FC = () => {

    const dispatch = useAppDispatch();
    const currencies: ICurrency[] = useAppSelector(state => state.app.currencies);
    const [currentCurrencies, setCurrentCurrencies] = useState<ICurrency[]>([])
    const [currentCurrency, setCurrentCurrency] = useState<string>('UAH')



    useEffect(() => {
        if (currencies.length === 0) {
            dispatch(getCurrencies())
        } else {
            setCurrentCurrencies(currencies)
        }
    }, [currencies])

    useEffect(() => {
        const newCurrencies = currentCurrencies.map(c => {

            const rateIn: number = currencies[currencies.map(c => c.cc).indexOf(currentCurrency)].rate;
            const rateOut: number = currencies[currencies.map(c => c.cc).indexOf(c.cc)].rate;
            const resultValue: number = 1 / rateIn * rateOut;

            const newCurrency: ICurrency = {
                cc: c.cc,
                txt: c.txt,
                rate: resultValue,
                r030: c.r030,
                exchangedate: c.exchangedate
            }
            return newCurrency
        })

        setCurrentCurrencies(newCurrencies)
    }, [currentCurrency])

    function selectorHandler (e: React.ChangeEvent<HTMLSelectElement>) {
        setCurrentCurrency(e.target.value)
    }

    return (
        <div className={'Currencies'}>
            <h1 className={'Currencies__title'}>Валюти</h1>
            <div className={'Currencies__options content__box'}>
                <h2 className={'Currencies__options-title'}>Обрана валюта: {currentCurrency}</h2>
                <select className={'Currencies__options-select'} onChange={(e) => selectorHandler(e)} name="currencies" value={currentCurrency}>
                    {(currencies.map(c => c.cc)).map(c => {
                        return (
                            <option value={c}>{c}</option>
                        )
                    })}
                </select>
            </div>
            <div className={'Currencies__result content__box'}>
                <div className={'Currencies__result-title'}>
                    <span className={'Currencies__result-title-item Currencies__result-title-item_txt'}>Назва</span>
                    <div className={'Currencies__result-title-line'}></div>
                    <span className={'Currencies__result-title-item Currencies__result-title-item_cc'}>Скорочення</span>
                    <div className={'Currencies__result-title-line'}></div>
                    <span className={'Currencies__result-title-item Currencies__result-title-item_rate'}>Курс до {currentCurrency}</span>
                    <div className={'Currencies__result-title-line'}></div>
                    <span className={'Currencies__result-title-item Currencies__result-title-item_date'}>Дата оновлення</span>
                </div>
                {currentCurrencies.map(currency => {
                    return (
                        <Currency key={uuid()} currency={currency}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Currencies;