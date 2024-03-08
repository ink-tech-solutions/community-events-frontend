export interface AlertProps {
    type: 'success' | 'info' | 'warning' | 'danger';
    message: string;
}

export type AlertTypes = 'success' | 'info' | 'warning' | 'danger';

export interface AuthState {
    isAuthenticated: boolean;
    userName: string;
    accessToken: string;
    email: string;
    avatar: string;
}
