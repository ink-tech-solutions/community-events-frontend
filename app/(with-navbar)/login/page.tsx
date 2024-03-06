'use client';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import { useState } from 'react';

const SignInAndRegister = () => {
    const [hasAccount, setHasAccount] = useState(true);

    const toggleHasAccount = () => {
        setHasAccount(prev => !prev);
    };

    return <main className="flex h-full justify-center items-start">{hasAccount ? <SignIn toggleHasAccount={toggleHasAccount} /> : <SignUp toggleHasAccount={toggleHasAccount} />}</main>;
};

export default SignInAndRegister;
