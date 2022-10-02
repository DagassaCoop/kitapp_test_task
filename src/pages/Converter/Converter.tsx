import React, { useState, useEffect } from "react";
import './Converter.scss'
import SearchResult from "pages/Converter/SearchResult/SearchResult";
import Modal from "components/Modal/Modal";
import { ICurrency } from "interfaces/Currency";
import { useAppSelector, useAppDispatch } from "hooks/storeHooks";
import { getCurrencies } from "store/slices/appSlice";
import { convert, validateInput, IValidateResult } from "helper/converter";

const searchHelp = require('assets/search-help.png');
const URL: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'

interface IConvertResult {
    value: number;
    txtIn: string;
    txtOut: string;
}

export type TSearchResult = {
    validateResult: IValidateResult,
    convertResult?: IConvertResult
}

const Converter: React.FC = () => {

    const dispatch = useAppDispatch();

    const currencies: ICurrency[] = useAppSelector(state => state.app.currencies);
    const [inputValue, setInputValue] = useState<string>('');
    const [searchResult, setSearchResult] = useState<TSearchResult | undefined>(undefined);
    const [modalActive, setModalActive] = useState<boolean>(false);


    function searchButtonHandler (){

        const currenciesCC: Array<string> = currencies.map(c => c.cc)
        const validateResult: IValidateResult = validateInput(inputValue, currenciesCC)

        if (validateResult.ccIn && validateResult.ccOut && validateResult.value) {

            const currencyIn = currencies[currenciesCC.indexOf(validateResult.ccIn)]
            const currencyOut = currencies[currenciesCC.indexOf(validateResult.ccOut)]
            const convertResult: IConvertResult = {
                value: convert(validateResult.value, currencyIn, currencyOut),
                txtIn: currencyIn.txt,
                txtOut: currencyOut.txt
            }

            setSearchResult({
                validateResult,
                convertResult
            })
        } else {
            setSearchResult({validateResult})
        }
    }

    function modalButtonHandler () {
        setModalActive(true)
    }
    useEffect(() => {
        if (currencies.length === 0) {
            dispatch(getCurrencies())
        }
    }, [])

    return (
        <div className={'Converter'}>
            <h1 className={'Converter__title'}>Конвертер</h1>
            <div className={'content__box Converter__search'}>
                <div className={'Converter__search-input'}>
                    <input
                    onChange={(e) => setInputValue(e.target.value)}
                        className={'Converter__search-input-text'}
                        type="text"
                        placeholder={'Введіть запит виду “15 usd” in “uah”'}
                    />
                    <div onClick={() => modalButtonHandler()} className={'Converter__search-help'}>
                        <img className={'Converter__search-help-icon'} src={searchHelp} alt="Help Info"/>
                    </div>
                </div>
                <button onClick={searchButtonHandler} className={'Converter__search-button'}>
                    Конвертувати
                </button>
            </div>
            {
                searchResult !== undefined
                    ? (
                        <div className={'content__box'}>
                            <SearchResult validateResult={searchResult.validateResult} convertResult={searchResult.convertResult}/>
                        </div>
                    )
                    : null
            }
            <Modal active={modalActive} setActive={setModalActive}/>
        </div>
    )
}

export default Converter;