import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="bg-gray-100 py-20 flex min-h-screen flex-col justify-start p-24 items-center">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Welcome to Your Website</h1>
                <p className="text-lg text-center text-gray-700">This is a beautiful landing page created with Next.js, Tailwind CSS, and TypeScript.</p>
            </div>
        </div>
    );
};

export default Home;
