'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState, Suspense } from 'react';
import { verifyToken } from '@/app/services/authService';
import { showToast } from '../../../utils/alert';
import Alert from '@/app/components/Alert';

const VerifyPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');
    const [alert, setAlert] = useState<ReactNode | null>(null);
    const [loading, setLoading] = useState(true);

    const handleVerifyToken = async (token: string) => {
        try {
            const result = await verifyToken(token);
            if (result.statusCode === 200) {
                setAlert(<Alert type="success" message={result.message} />);
            } else {
                setAlert(<Alert type="warning" message={result.message} />);
            }
        } catch (error) {
            setAlert(<Alert type="danger" message={(error as any).response.data.message} />);
        } finally {
            setLoading(false);
            setTimeout(() => {
                router.push('/');
            }, 2000);
        }
    };

    useEffect(() => {
        if (!token) return;
        handleVerifyToken(token);
    }, [token]);

    return (
        <main className="flex min-h-screen flex-col justify-start p-24 items-center">
            <Suspense fallback={<div>Loading...</div>}>
                <div className="w-[400px]">{alert}</div>
            </Suspense>{' '}
            {!loading && (
                <div className="mt-10 flex items-center gap-4">
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>{' '}
                    <p className=""> Redirecting to the signing page...</p>
                </div>
            )}
        </main>
    );
};

export default VerifyPage;
