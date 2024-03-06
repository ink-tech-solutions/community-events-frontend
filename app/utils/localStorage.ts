'use client';

export const addUserToLocalStorage = (auth: any) => {
    return;
    localStorage?.setItem('auth', JSON.stringify(auth));
};

export const removeUserFromLocalStorage = () => {
    return;
    localStorage?.removeItem('auth');
};

export const getUserFromLocalStorage = () => {
    return;
    // if (typeof window === 'undefined') {
    //     // Return default values if running on the server
    //     return { isAuthenticated: false, userName: '', accessToken: '', email: '', avatar: '' };
    // }
    // const result = window.localStorage.getItem('auth');
    // const user = result && JSON.parse(result);
    // return user;
};
