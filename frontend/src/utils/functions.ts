import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { ITokenPayload } from '../types/types';

export const getDecodedToken = (): ITokenPayload | null => {
    const token = Cookies.get('token');
    if (token) {
        const decodedToken = jwtDecode<ITokenPayload>(token);
        return decodedToken;
    }
    return null;
}