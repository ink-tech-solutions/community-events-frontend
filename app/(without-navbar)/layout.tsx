import '../globals.css';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <section>{children}</section>;
}
