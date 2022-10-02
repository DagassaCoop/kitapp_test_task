import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import {ICurrency} from "@/interfaces/Currency";


export const getCurrencies = createAsyncThunk(
    'app/getCurrencies',
    async function (): Promise<ICurrency[]> {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
        const data = await response.json();
        const currencyUAH: ICurrency = {
            r030: 0,
            txt: 'Українська гривня',
            cc: 'UAH',
            rate: 1,
            exchangedate: (new Date()).toLocaleDateString().replace(/\//g,'.')
        }
        data.unshift(currencyUAH)
        return data;
    }
)

const initialState: { currencies: ICurrency[] } = {
    currencies: []
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(
            getCurrencies.fulfilled,
            (state, action: PayloadAction<ICurrency[]>) => {
                state.currencies = action.payload;
            });
    }
})

export default appSlice.reducer;