import React, { useState, useReducer } from 'react';
import { BiSolidShow, BiSolidHide } from 'react-icons/bi';
import { signUp } from '../(services)/authService';
import { FaCheck } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

type Action = { type: 'updateCondition'; key: string; value: boolean } | { type: 'updateStrength'; value: number };

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
        default:
            return state;
    }
};

interface Props {
    toggleHasAccount: () => void;
}

const PasswordInput: React.FC<{ password: string; setPassword: (param: string) => void }> = ({ password, setPassword }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputFocus, setPasswordInputFocus] = useState(false);
    const [passwordRequirements, dispatch] = useReducer(initialReducer, initialState);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const passwordStrengthColors = ['bg-gray-300', 'bg-red-500', 'bg-orange-300', 'bg-yellow-300', 'bg-green-500'];

    const toggleShowPassword = (e: any) => {
        e.preventDefault();
        setShowPassword(prev => !prev);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
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
    return (
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
                    onFocus={() => setPasswordInputFocus(true)}
                    onBlur={() => setPasswordInputFocus(false)}
                />
                {passwordInputFocus && (
                    <div className="absolute top-1/2 right-9 transform -translate-y-1/2 cursor-pointer" onMouseDown={toggleShowPassword}>
                        {showPassword ? <BiSolidShow /> : <BiSolidHide />}
                    </div>
                )}
            </div>
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
                    <li className={`flex items-center gap-1 ${passwordRequirements.digit && 'text-gray-900'}`}>{passwordRequirements.digit ? <FaCheck color="green" /> : <GoDotFill />} 1 digit</li>
                </ul>
            </div>
        </div>
    );
};

export default PasswordInput;
