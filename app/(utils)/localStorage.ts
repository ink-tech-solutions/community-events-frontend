'use client';
import { AuthState } from '../../lib/redux/slices/auth';

export const addUserToLocalStorage = (auth: any) => {
    localStorage?.setItem('auth', JSON.stringify(auth));
};

export const removeUserFromLocalStorage = () => {
    localStorage?.removeItem('auth');
};

export const getUserFromLocalStorage = () => {
    const result = localStorage?.getItem('auth');
    const user = result ? JSON.parse(result) : { isAuthenticated: false, userName: '', accessToken: '', email: '' };
    return user;
};
