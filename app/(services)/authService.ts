import { changePasswordEndPoint, loginEndPoint, passwordResetRequestEndPoint, signUpEndPoint, verifyPasswordResetTokenEndPoint, verifyTokenEndPoint } from '@/app/(utils)/constants/endpoints';
import axios from 'axios';

export const signIn = async (email: string, password: string) => {
    try {
        const response = await axios.post(loginEndPoint, { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(signUpEndPoint, { name, email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyToken = async (token: string) => {
    try {
        const response = await axios.get(verifyTokenEndPoint + token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const passwordResetRequest = async (email: string) => {
    try {
        const response = await axios.post(passwordResetRequestEndPoint, { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const verifyPasswordResetToken = async (token: string) => {
    try {
        const response = await axios.get(verifyPasswordResetTokenEndPoint + token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (password: string, token: string) => {
    try {
        const response = await axios.post(changePasswordEndPoint, { password, token });
        return response.data;
    } catch (error) {
        throw error;
    }
};
