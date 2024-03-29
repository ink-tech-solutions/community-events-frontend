import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                <body className={'min-h-screen bg-gray-100 dark:bg-slate-800'}>
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
                    <Providers>
                        <Suspense>{children}</Suspense>
                        <Loading />
                    </Providers>
                </body>
            </html>
        </StoreProvider>
    );
}
