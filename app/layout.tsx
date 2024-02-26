import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import StoreProvider from './StoreProvider';
import { Suspense } from 'react';
import Loading from './components/Loading';
import { Providers } from './components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Community Events',
    description: 'Community Events',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={'min-h-screen'}>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                        theme="light"
                    />
                    {/* <Navbar /> */}
                    <Providers>
                        {children}
                        <Loading />
                    </Providers>
                </body>
            </html>
        </StoreProvider>
    );
}
