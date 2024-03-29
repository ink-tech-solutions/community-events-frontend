'use client';
import React, { ReactNode, useState } from 'react';
import { passwordResetRequest } from '@/app/services/authService';
import Alert from '@/app/components/Alert';

const PasswordResetRequestPage = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState<ReactNode | null>(null);

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const result = await passwordResetRequest(email);

            if (result.statusCode === 200) {
                setAlert(<Alert type="success" message={result.message} />);
            }
        } catch (error) {
            setAlert(<Alert type="danger" message={(error as any).response.data.message} />);
        }
    };

    return (
        <main className="flex min-h-screen flex-col justify-start p-24 items-center">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleFormSubmit}>
                    {alert}
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
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Send Email
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default PasswordResetRequestPage;
