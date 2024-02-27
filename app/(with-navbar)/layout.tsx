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
        <section>
            <Navbar />
            <Suspense>{children}</Suspense>
        </section>
    );
}
