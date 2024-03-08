import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Cookies } from 'react-cookie';
import { AuthState } from '@/app/types/common';
import { getUserFromCookies } from '@/app/utils/functions';

const cookies = new Cookies();

const initialState: AuthState = getUserFromCookies(cookies) || {
    isAuthenticated: false,
    userName: '',
    accessToken: '',
    email: '',
    avatar: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.userName = action.payload.userName;
            state.accessToken = action.payload.accessToken;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            cookies.set('user', action.payload, { path: '/' });
        },
        logout: state => {
            state.isAuthenticated = false;
            state.userName = '';
            state.accessToken = '';
            state.email = '';
            state.avatar = '';
            cookies.remove('user', { path: '/' });
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
