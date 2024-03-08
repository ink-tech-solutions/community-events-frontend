import { AuthState } from '../types/common';
import { Cookies } from 'react-cookie';

export const validateNameRequirements = (value: string) => {
    if (!value) {
        return 'Name field can not be empty.';
    }

    if (value.length < 3) {
        return 'Name must be at least 3 characters long.';
    }
    if (value.length > 50) {
        return 'Name cannot be more than 50 characters long.';
    }

    return;
};
export const validateEmailRequirements = (value: string) => {
    if (!value) {
        return 'Email field can not be empty.';
    }
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    if (!emailRegex.test(value)) {
        return 'Please provide a valid email.';
    }
};
// Validation function for email
export const validatePasswordRequirements = (value: string) => {
    if (!value) {
        return 'Email field can not be empty.';
    }
    const errors = [];

    if (value.length < 6) {
        errors.push('6 characters');
    }
    if (!/(?=.*[a-z])/.test(value)) {
        errors.push('one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(value)) {
        errors.push('one uppercase letter');
    }
    if (!/(?=.*\d)/.test(value)) {
        errors.push('one digit');
    }

    if (errors.length > 0) {
        return `Password must include at least ${errors.join(', ')}.`;
    }
};

export const getUserFromCookies = (): AuthState | false => {
    const cookies = new Cookies();
    const userCookie = cookies.get('user'); // Get user information from cookies
    if (userCookie) {
        return userCookie;
    }
    return false;
};
