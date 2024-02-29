'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';
import { signIn } from '../services/authService';
import Alert from './Alert';
import { AlertTypes } from '../types/common';
import { loginSuccess, selectAuth } from '../../lib/redux/slices/auth';
import { useAppDispatch, useAppStore } from '../../lib/redux/hooks';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../utils/localStorage';
import useCapsLockDetector from '../hooks/useCapsLockDetector';

interface Props {
    toggleHasAccount: () => void;
}

const SignIn: React.FC<Props> = ({ toggleHasAccount }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(false);
    const [alert, setAlert] = useState<ReactNode | null>(null);
    const capsLockOn = useCapsLockDetector();

    const store = useAppStore();
    const initialized = useRef(false);
    if (!initialized.current) {
        store.dispatch(selectAuth as any);
        initialized.current = true;
    }

    const dispatch = useAppDispatch();

    const toggleShowPassword = (e: any) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    };

    const handleSetAlert = (type: AlertTypes, message: string, duration: number) => {
        setAlert(<Alert type={type} message={message} />);
        setTimeout(() => {
            setAlert(null);
        }, duration);
    };

    useEffect(() => {
        setEmail(getUserFromLocalStorage()?.email);
        setPassword(getUserFromLocalStorage()?.password);
    }, []);
    const handleSignIn = async (e: any) => {
        e.preventDefault();

        try {
            const result = await signIn(email, password);

            if (result.statusCode === 200) {
                handleSetAlert('success', result.message, 3000);
                const user = {
                    isAuthenticated: true,
                    userName: result.userName,
                    email: result.email,
                    avatar: result.avatar,
                    accessToken: result.access_token,
                };
                dispatch(loginSuccess(user));
                addUserToLocalStorage(user);
            }
        } catch (error) {
            handleSetAlert('danger', (error as any).response.data.message, 3000);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-start px-6 py-12 lg:px-8">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">Sign In</h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {alert}
                <form className="space-y-6" onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="/auth/password_reset_request" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onFocus={() => setPasswordInputFocus(true)}
                                onBlur={() => setPasswordInputFocus(false)}
                            />
                            {passwordInputFocus && (
                                <div className={`absolute top-1/2 ${capsLockOn && !showPassword ? 'right-14' : 'right-9'} transform -translate-y-1/2 cursor-pointer`} onMouseDown={toggleShowPassword}>
                                    {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a onClick={toggleHasAccount} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
