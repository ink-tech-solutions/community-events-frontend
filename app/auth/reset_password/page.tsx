'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { changePassword, verifyPasswordResetToken } from '@/app/(services)/authService';
import { showToast } from '../../(utils)/alert';
import Alert from '@/app/(components)/Alert';
import PasswordInput from '@/app/(components)/PasswordInput';

const PasswordResetPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [alert, setAlert] = useState<ReactNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState('');
    const handleVerifyToken = async (token: string) => {
        try {
            const result = await verifyPasswordResetToken(token);
            if (result.statusCode === 200) {
                setAlert(<Alert type="success" message={result.message} />);
            } else {
                setAlert(<Alert type="warning" message={result.message} />);
            }
        } catch (error) {
            setAlert(<Alert type="danger" message={(error as any).response.data.message} />);
        }
    };

    const handleSubmitForm = async (e: any) => {
        e.preventDefault();
        if (!token) {
            return;
        }
        try {
            const result = await changePassword(password, token);
            if (result.statusCode === 200) {
                setAlert(<Alert type="success" message={result.message} />);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } else {
                setAlert(<Alert type="warning" message={result.message} />);
            }
        } catch (error) {
            setAlert(<Alert type="danger" message={(error as any).response.data.message} />);
        }
    };

    useEffect(() => {
        if (!token) return;
        handleVerifyToken(token);
    }, [token]);

    return (
        <main className="flex min-h-screen flex-col justify-start p-24 items-center">
            <div className="w-[400px]">{alert}</div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmitForm}>
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
            {/* <form className="space-y-6" onSubmit={handleFormSubmit}></form> */}
            {/* {!loading && (
                <div className="mt-10 flex items-center gap-4">
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>{' '}
                    <p className=""> Please enter your new password</p>
                </div>
            )} */}
        </main>
    );
};

export default PasswordResetPage;
