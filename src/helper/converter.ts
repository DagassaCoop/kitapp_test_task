import { ICurrency } from "@/interfaces/Currency";
import { useAppSelector } from "hooks/storeHooks";

export const convert = (value: number = 1, currencyIn: ICurrency, currencyOut: ICurrency): number => {

    let resultValue: number = 0;

    if (currencyIn === currencyOut) {
        resultValue = value;
    } else {
        if (currencyIn.cc === 'UAH') {
            const rate: number = currencyOut.rate;
            resultValue = value / rate;
        } else if (currencyOut.cc === 'UAH') {
            const rate: number = currencyIn.rate;
            resultValue = value * rate;
        } else {
            const rateIn: number = currencyIn.rate;
            const rateOut: number = currencyOut.rate;
            resultValue = value / rateIn * rateOut;
        }
    }

    return resultValue;
}

export interface IValidateResult {
    status: boolean,
    value?: number,
    ccIn?: string,
    ccOut?: string,
    error?: string
}

export const validateInput = (str: string, ccList: Array<string>): IValidateResult => {

    function valueCheck (str: string) {
        // console.log('valueCheck >> ', str)
        const regNumber = new RegExp(/^(0|[1-9]\d*)(\.[0-9]{1,5})?$/)
        const result = regNumber.test(str);
        if (!result) {
            validateResult.error = 'Введіть кількість валюти згідно з шаблоном.'
            console.log(validateResult.error)

        }
        return !result;
    }

    function ccCheck (str: string) {
        // console.log('ccCheck >> ', str)
        if (str.length !== 3) {
            validateResult.error = `Абревіатура валюти (${str}) має містити 3 симола.`
            console.log(validateResult.error)
            return true
        }
        if (ccList.indexOf(str.toUpperCase()) === -1) {
            validateResult.error = `На жаль валюта (${str}) не підтримається, спробуйте іншу.`
            console.log(validateResult.error)
            return true
        }
        return false;
    }


    let validateResult: IValidateResult = {status: false};

    let strList = str.split(' ')
    // console.log('Input list >> ', strList)

    if (strList.length !== 4 || strList[2] !== 'in') {
        validateResult.error = 'Структура запиту не вірна.'
        console.log(validateResult.error)
        return validateResult
    } else {
        strList = strList.map(el => el.replace(/"/g, ''))
    }

    if (valueCheck(strList[0]) || ccCheck(strList[1]) || ccCheck(strList[3])) {
        return validateResult;
    } else {
        validateResult.status = true;
        validateResult.value = parseFloat(strList[0]);
        validateResult.ccIn = strList[1].toUpperCase();
        validateResult.ccOut = strList[3].toUpperCase();
    }

    return validateResult;
}