'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState, Suspense, useLayoutEffect } from 'react';
import { changePassword, verifyPasswordResetToken } from '@/app/services/authService';
import Alert from '@/app/components/Alert';
import PasswordInput from '@/app/components/PasswordInput';
import { validatePasswordRequirements } from '@/app/utils/functions';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/lib/redux/slices/loading';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../../../lib/redux/slices/loading';

const PasswordResetPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams?.get('token');
    const [password, setPassword] = useState('');
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);

    const handleVerifyToken = async (token: string) => {
        dispatch(setLoading(true));
        try {
            const result = await verifyPasswordResetToken(token);
            // if (result.statusCode === 200) {
            // setAlert(<Alert type="success" message={result.message} />);
            // setSuccessMessage(result.message);

            // } else {
            //     setAlert(<Alert type="warning" message={result.message} />);
            // }
            setTimeout(() => {
                dispatch(setLoading(false));
                setIsTokenVerified(true);
            }, 3000);
        } catch (error) {
            // setAlert(<Alert type="danger" message={(error as any).response.data.message} />);
            // if ((error as any).response && (error as any).response.data && (error as any).response.data.errors) {
            setErrors({ token: (error as any).response.data.message });
            // }
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSubmitForm = async (e: any) => {
        e.preventDefault();
        if (!token) {
            return;
        }
        const passwordError = validatePasswordRequirements(password);

        // Update errors state
        setErrors({
            password: passwordError,
        });
        if (passwordError) {
            return;
        }
        try {
            const result = await changePassword(password, token);
            // if (result.statusCode === 200) {
            // setAlert(<Alert type="success" message={result.message} />);
            setSuccessMessage(result.message);
            setTimeout(() => {
                router.push('/');
            }, 2000);
            // } else {
            //     setAlert(<Alert type="warning" message={result.message} />);
            // }
        } catch (error) {
            // setAlert(<Alert type="danger" message={(error as any).response.data.message} />);
            if ((error as any).response && (error as any).response.data && (error as any).response.data.errors) {
                setErrors((error as any).response.data.errors);
            } else {
                console.error('An error occurred:', error);
                setErrors((prev: any) => ({ ...prev, email: (error as any).response.data.message }));
            }
        }
    };

    useLayoutEffect(() => {
        if (!token) return;
        handleVerifyToken(token);
    }, [token]);

    return !isLoading ? (
        <main className="flex w-full h-full p-24">
            {/* <Suspense fallback={<div>Loading...</div>}>
                <div className="w-[400px]">{alert}</div>
            </Suspense>{' '} */}
            <Suspense fallback={<div>Loading...</div>}>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{errors.token && <Alert type="danger" message={errors.token} />}</div>
            </Suspense>

            {isTokenVerified && (
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Suspense fallback={<div>Loading...</div>}>
                        {errors.password && <Alert type="danger" message={errors.password} />}
                        {successMessage && <Alert type="success" message={successMessage} />}
                    </Suspense>
                    <form className="space-y-6" onSubmit={handleSubmitForm}>
                        <p className=""> Please enter your new password</p>
                        <PasswordInput password={password} setPassword={setPassword} />
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Apply
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    ) : null;
};

export default PasswordResetPage;
