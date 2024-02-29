'use client';

export const addUserToLocalStorage = (auth: any) => {
    localStorage?.setItem('auth', JSON.stringify(auth));
};

export const removeUserFromLocalStorage = () => {
    localStorage?.removeItem('auth');
};

export const getUserFromLocalStorage = () => {
    if (typeof window === 'undefined') {
        // Return default values if running on the server
        return { isAuthenticated: false, userName: '', accessToken: '', email: '', avatar: '' };
    }
    const result = window.localStorage.getItem('auth');
    const user = result && JSON.parse(result);
    return user;
};
