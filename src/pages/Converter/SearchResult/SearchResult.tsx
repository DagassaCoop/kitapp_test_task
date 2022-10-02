import React from "react";
import './SearchResult.scss'
import { TSearchResult } from "pages/Converter/Converter";


const SearchResult: React.FC<TSearchResult> = ({ validateResult, convertResult }) => {



    return (
        <div className={'SearchResult'}>
            <h3 className={'SearchResult__title'}>Результат конвертаціі</h3>
            {
                validateResult.status && convertResult
                    ? (
                        <div className={'SearchResult__content'}>
                            <div className={'SearchResult__content-row SearchResult__content-row_titles'}>
                                <span className={'SearchResult__currency-title'}>Валюта входу: <strong>{convertResult.txtIn} ({validateResult.ccIn})</strong></span>
                                <span className={'SearchResult__currency-title'}>Валюта виходу: <strong>{convertResult.txtOut} ({validateResult.ccOut})</strong></span>
                            </div>
                            <div className={'SearchResult__content-row SearchResult__content-row_values'}>
                                <span className={'SearchResult__currency-value'}>Кількість валюти входу: <strong>{validateResult.value}</strong></span>
                                <span className={'SearchResult__currency-value'}>Кількість валюти виходу (результат конвертаціі): <strong>{convertResult.value}</strong></span>
                            </div>
                        </div>
                    )
                    : (
                        <>
                            <span>Запит не пройшов валідацію.</span><br/>
                            <span>{validateResult.error}</span>
                        </>
                    )
            }

        </div>
    )
}

export default SearchResult;