import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { IDiscount, ITokenPayload } from '../types/types';

export const getDecodedToken = (): ITokenPayload | null => {
    const token = Cookies.get('token');
    if (token) {
        const decodedToken = jwtDecode<ITokenPayload>(token);
        return decodedToken;
    }
    return null;
}

export const calculateFinalPrice = (price: number, discounts: IDiscount[]): number => {
    const totalPercentage = discounts.reduce((acc, d) => acc + d.percentage, 0); // array.reduce((acumulador, valorActual) => {return nuevoAcumulador;}, valorInicial);)
    const finalPrice = price - (price * totalPercentage/100);
    return Number(finalPrice.toFixed(2)); // number.toFixed(n) devuelve un string con n cifras decimales
};