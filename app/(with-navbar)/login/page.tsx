'use client';
import { useRouter } from 'next/navigation';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { useState, Suspense, useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectAuth } from '@/lib/redux/slices/auth';

const SignInAndRegister = () => {
    const [hasAccount, setHasAccount] = useState(true);
    const router = useRouter();
    const { isAuthenticated } = useAppSelector(selectAuth);

    const toggleHasAccount = () => {
        setHasAccount(prev => !prev);
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    return <main className="flex h-full justify-center items-start">{hasAccount ? <SignIn toggleHasAccount={toggleHasAccount} /> : <SignUp toggleHasAccount={toggleHasAccount} />}</main>;
};

export default SignInAndRegister;
