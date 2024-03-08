'use client';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';

const CookiePermission = () => {
    const [showConsentBanner, setShowConsentBanner] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const cookies = new Cookies();
    const hasConsent = cookies.get('consent'); // Assume 'consent' is the cookie key for consent
    useEffect(() => {
        if (!hasConsent) {
            setShowConsentBanner(true);
        }
    }, []);

    const handleAccept = () => {
        // setCookie('cookieConsent', true, { path: '/' });
        cookies.set('consent', true, { path: '/' });
        setShowConsentBanner(false);
    };

    const handleDecline = () => {
        cookies.set('consent', false, { path: '/' });
        setShowConsentBanner(false);
    };

    if (showConsentBanner && !hasConsent) {
        return (
            <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 text-center">
                <p className="text-sm">
                    We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.{' '}
                    <button className="text-blue-300 hover:text-blue-400" onClick={handleAccept}>
                        Accept
                    </button>{' '}
                    <button className="text-blue-300 hover:text-blue-400" onClick={handleDecline}>
                        Decline
                    </button>
                </p>
            </div>
        );
    }

    return null;
};

export default CookiePermission;
