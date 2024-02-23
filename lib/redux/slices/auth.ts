'use client';
import { createSlice } from '@reduxjs/toolkit';
import { addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from '../../../app/(utils)/localStorage';
import { RootState } from '../store';
import { clearTasks } from './tasks';

export interface AuthState {
    isAuthenticated: boolean;
    userName: string;
    accessToken: string;
    email: string;
    avatar: string;
}

// const initialState: AuthState = getUserFromLocalStorage() || { isAuthenticated: false, userName: '', accessToken: '', email: '' };
const initialState: AuthState = { isAuthenticated: false, userName: '', accessToken: '', email: '', avatar: '' };

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
            addUserToLocalStorage(action.payload);
        },
        logout: state => {
            state.isAuthenticated = false;
            state.userName = '';
            state.accessToken = '';
            state.email = '';
            state.avatar = '';
            removeUserFromLocalStorage();
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
