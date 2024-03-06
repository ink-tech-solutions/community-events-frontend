'use client';
import Link from 'next/link';
import ThemeChanger from './DarkSwitch';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { loginSuccess, logout, selectAuth } from '@/lib/redux/slices/auth';
import { useDispatch } from 'react-redux';
import { getUserFromLocalStorage } from '../utils/localStorage';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const navigation = ['Product', 'Features', 'Pricing', 'Company', 'Blog'];
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const { userName, isAuthenticated, avatar } = useAppSelector(selectAuth);

    const dispatch = useDispatch();

    useEffect(() => {
        const storedAuth = getUserFromLocalStorage();
        if (storedAuth) {
            // Update auth state if localStorage contains auth data
            dispatch(loginSuccess(storedAuth));
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="w-full">
            <nav className="container relative flex flex-wrap items-center justify-center p-8 mx-auto md:justify-between px-0">
                {/* Logo  */}
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex flex-wrap items-center justify-between w-full lg:w-fit">
                                <Link href="/" className="cursor-pointer">
                                    {mounted ? (
                                        theme === 'light' ? (
                                            <Image src="/community-events-logo-with-brand-name.png" alt="CE" width="250" height="100" priority />
                                        ) : (
                                            <Image src="/community-events-logo-with-brand-name-dark.png" alt="CE" width="250" height="100" priority />
                                        )
                                    ) : (
                                        <div className="w-[250px] h-[100px]"></div>
                                    )}
                                </Link>

                                <Disclosure.Button
                                    aria-label="Toggle Menu"
                                    className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                                >
                                    <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        {open && (
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                            />
                                        )}
                                        {!open && <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />}
                                    </svg>
                                </Disclosure.Button>
                                <div className="lg:hidden flex">
                                    <ThemeChanger />
                                </div>
                                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                                    <>
                                        {navigation.map((item, index) => (
                                            <Link
                                                key={index}
                                                href="/"
                                                className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                        <Link href="/" className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5">
                                            Get Started
                                        </Link>
                                    </>
                                </Disclosure.Panel>
                            </div>
                        </>
                    )}
                </Disclosure>

                {/* menu  */}
                <div className="hidden text-center lg:flex lg:items-center">
                    <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
                        {navigation.map((menu, index) => (
                            <li className="mr-0 xl:mr-3 nav__item" key={index}>
                                <Link
                                    href="/"
                                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                                >
                                    {menu}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="hidden mr-3 space-x-4 lg:flex nav__item">
                    {!isAuthenticated ? (
                        <Link href="/login" className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
                            Get Started
                        </Link>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="relative rounded-full p-1 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon strokeWidth={2} className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div className="rounded-full border-2 border-gray-700 dark:border-gray-300">
                                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <Image width={300} height={300} className="h-8 w-8 rounded-full" src={`/default-avatar.png`} alt={`${userName}_profile_avatar`} />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }: any) => (
                                                <Link href="/profile/12" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                    Settings
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }: any) => (
                                                <Link href="/" onClick={handleLogout} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                                                    Sign out
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </>
                    )}
                    <ThemeChanger />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
