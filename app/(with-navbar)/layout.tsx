import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { Suspense } from 'react';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="px-4 sm:px-12 xl:px-24 flex min-h-screen flex-col justify-start items-center">
            <Navbar />
            <Suspense>{children}</Suspense>
        </section>
    );
}
