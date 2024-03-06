import '../globals.css';
import Navbar from '../components/Navbar';
import { Suspense } from 'react';

function Layout({
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

export default Layout;
