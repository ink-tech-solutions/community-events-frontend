import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <Navbar />
            {children}
        </section>
    );
}
