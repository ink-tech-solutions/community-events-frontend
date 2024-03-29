'use client';
import React, { useState, useReducer } from 'react';
import { signUp } from '../services/authService';
import { FaCheck } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';
import Alert from './Alert';
import useCapsLockDetector from '../hooks/useCapsLockDetector';
import { validateEmailRequirements, validateNameRequirements, validatePasswordRequirements } from '../utils/functions';
import { FormEvent } from 'react';

type Action = { type: 'updateCondition'; key: string; value: boolean } | { type: 'updateStrength'; value: number } | { type: 'reset' };

type State = {
    sixChars: boolean;
    lowerLetter: boolean;
    upperLetter: boolean;
    digit: boolean;
};

const initialState: State = {
    sixChars: false,
    lowerLetter: false,
    upperLetter: false,
    digit: false,
};

const initialReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'updateCondition':
            return {
                ...state,
                [action.key]: action.value,
            };
        case 'reset':
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

interface Props {
    toggleHasAccount: () => void;
}

const SignUp: React.FC<Props> = ({ toggleHasAccount }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRequirements, dispatch] = useReducer(initialReducer, initialState);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState('');
    const capsLockOn = useCapsLockDetector();

    const toggleShowPassword = (e: any) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    };

    const passwordStrengthColors = ['bg-gray-300', 'bg-red-500', 'bg-orange-300', 'bg-yellow-300', 'bg-green-500'];

    const handleSignUp = async (e: any) => {
        e.preventDefault();

        // Validate inputs
        const nameError = validateNameRequirements(name);
        const emailError = validateEmailRequirements(email);
        const passwordError = validatePasswordRequirements(password);

        // Update errors state
        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
        });

        // If any validation error exists, stop form submission
        if (nameError || emailError || passwordError) {
            return;
        }

        try {
            const result = await signUp(name, email, password);

            if (result.statusCode === 201) {
                setSuccessMessage(result.message);
                resetForm();
            }
        } catch (error) {
            if ((error as any).response && (error as any).response.data && (error as any).response.data.errors) {
                setErrors((error as any).response.data.errors);
            } else {
                console.error('An error occurred:', error);
                setErrors((prev: any) => ({ ...prev, email: (error as any).response.data.message }));
            }
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        dispatch({ type: 'reset' });
        setPasswordStrength(0);
    };

    const passwordStrengthLevel = (strength: number) => {
        switch (strength) {
            case 0:
                return 'Very Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Medium';
            case 3:
                return 'Strong';
            case 4:
                return 'Excellent';

            default:
                break;
        }
    };

    const validatePassword = (value: string): void => {
        // Check for at least 6 characters

        if (value.length >= 6) {
            if (!passwordRequirements.sixChars) {
                dispatch({ type: 'updateCondition', key: 'sixChars', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.sixChars) {
                dispatch({ type: 'updateCondition', key: 'sixChars', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }

        // Check for at least 1 lowercase character
        if (/[a-z]/.test(value)) {
            if (!passwordRequirements.lowerLetter) {
                dispatch({ type: 'updateCondition', key: 'lowerLetter', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.lowerLetter) {
                dispatch({ type: 'updateCondition', key: 'lowerLetter', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }

        // Check for at least 1 uppercase character
        if (/[A-Z]/.test(value)) {
            if (!passwordRequirements.upperLetter) {
                dispatch({ type: 'updateCondition', key: 'upperLetter', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.upperLetter) {
                dispatch({ type: 'updateCondition', key: 'upperLetter', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }

        // Check for at least 1 digit
        if (/\d/.test(value)) {
            if (!passwordRequirements.digit) {
                dispatch({ type: 'updateCondition', key: 'digit', value: true });
                setPasswordStrength(prev => prev + 1);
            }
        } else {
            if (passwordRequirements.digit) {
                dispatch({ type: 'updateCondition', key: 'digit', value: false });
                setPasswordStrength(prev => prev - 1);
            }
        }
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };
    // Validation function for email

    return (
        <div className="flex min-h-full flex-1 flex-col justify-start px-6 py-12 lg:px-8">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {successMessage && <Alert type="success" message={successMessage} />}
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                minLength={3}
                                maxLength={50}
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {errors.name && <Alert type="danger" message={errors.name} />}
                    </div>
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
                        {errors.email && <Alert type="danger" message={errors.email} />}
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2 relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$"
                                onFocus={() => setPasswordInputFocus(true)}
                                onBlur={() => setPasswordInputFocus(false)}
                            />
                            {passwordInputFocus && (
                                <div className={`absolute top-1/2 ${capsLockOn && !showPassword ? 'right-14' : 'right-9'} transform -translate-y-1/2 cursor-pointer`} onMouseDown={toggleShowPassword}>
                                    {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                                </div>
                            )}
                        </div>
                        {errors.password && <Alert type="danger" message={errors.password} />}
                        <div className="flex-column items-center justify-between">
                            <div className="mt-4 flex items-center gap-4">
                                <p className="text-xs font-medium leading-6 text-gray-900">Password strength</p>
                                <div className={`h-2 w-[100px] max-w-md bg-gray-400 rounded-full overflow-hidden`}>
                                    <div className={`h-full ${passwordStrengthColors[passwordStrength]} transition-all duration-500 ease-in-out`} style={{ width: `${passwordStrength * 25}%` }}></div>
                                </div>
                                <p className="text-xs font-medium leading-6 text-gray-900">{passwordStrengthLevel(passwordStrength)}</p>
                            </div>
                            <div className="mt-2 block text-xs font-medium leading-6 text-gray-600">Must contain at least</div>
                            <ul className="list-none text-xs font-medium leading-6 text-gray-400">
                                <li className={`flex items-center gap-1 ${passwordRequirements.sixChars && 'text-gray-900'}`}>
                                    {passwordRequirements.sixChars ? <FaCheck color="green" /> : <GoDotFill />} 6 characters
                                </li>
                                <li className={`flex items-center gap-1 ${passwordRequirements.lowerLetter && 'text-gray-900'}`}>
                                    {passwordRequirements.lowerLetter ? <FaCheck color="green" /> : <GoDotFill />} 1 lower case character
                                </li>
                                <li className={`flex items-center gap-1 ${passwordRequirements.upperLetter && 'text-gray-900'}`}>
                                    {passwordRequirements.upperLetter ? <FaCheck color="green" /> : <GoDotFill />} 1 upper case character
                                </li>
                                <li className={`flex items-center gap-1 ${passwordRequirements.digit && 'text-gray-900'}`}>
                                    {passwordRequirements.digit ? <FaCheck color="green" /> : <GoDotFill />} 1 digit
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <a onClick={toggleHasAccount} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
