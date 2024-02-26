'use client';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { useState, Suspense } from 'react';

const SignInAndRegister = () => {
    const [hasAccount, setHasAccount] = useState(true);

    const toggleHasAccount = () => {
        setHasAccount(prev => !prev);
    };

    return <main className="flex min-h-screen flex-col justify-between p-24">{hasAccount ? <SignIn toggleHasAccount={toggleHasAccount} /> : <SignUp toggleHasAccount={toggleHasAccount} />}</main>;
};

export default SignInAndRegister;
