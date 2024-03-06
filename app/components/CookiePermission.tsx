'use client';
import React, { useState } from 'react';

interface CookiePermissionProps {
    onConsentGiven: () => void;
}

const CookiePermission: React.FC<CookiePermissionProps> = ({ onConsentGiven }) => {
    const [consentGiven, setConsentGiven] = useState(false);

    const handleConsent = () => {
        // Set consent given in state
        setConsentGiven(true);

        // Call the callback function to inform the parent component
        onConsentGiven();
    };

    const handleReject = () => {
        console.log('not accepted');

        // Handle rejection if needed (e.g., redirect to privacy policy)
    };

    return !consentGiven ? (
        <div className="cookie-banner">
            <p>This website uses cookies to enhance user experience and store authentication information. By continuing to use this site, you consent to the use of cookies.</p>
            <button onClick={handleConsent}>Accept</button>
            <button onClick={handleReject}>Reject</button>
        </div>
    ) : null;
};

export default CookiePermission;
