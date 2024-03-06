import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Cookies } from 'react-cookie'; // Import react-cookie to handle cookies

const cookies = new Cookies(); // Create a new instance of Cookies

export interface AuthState {
    isAuthenticated: boolean;
    userName: string;
    accessToken: string;
    email: string;
    avatar: string;
}

// Function to retrieve user information from cookies
const getUserFromCookies = (): AuthState => {
    const userCookie = cookies.get('user'); // Get user information from cookies
    if (userCookie) {
        return userCookie;
    }
    return { isAuthenticated: false, userName: '', accessToken: '', email: '', avatar: '' };
};

// Initial state is set by retrieving user information from cookies
const initialState: AuthState = getUserFromCookies();

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
            // Store user information in cookies
            cookies.set('user', action.payload, { path: '/' });
        },
        logout: state => {
            state.isAuthenticated = false;
            state.userName = '';
            state.accessToken = '';
            state.email = '';
            state.avatar = '';
            // Remove user information from cookies
            cookies.remove('user', { path: '/' });
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
