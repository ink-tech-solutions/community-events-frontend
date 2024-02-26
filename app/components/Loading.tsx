'use client';
import React from 'react';
import { MutatingDots, Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../lib/redux/slices/loading';

const Loading: React.FC = () => {
    const isLoading = useSelector(selectLoading);

    return isLoading ? (
        <div className="w-full h-full flex justify-center items-center bg-slate-700/70 absolute left-0 top-0">
            <div className="flex flex-col items-center justify-center gap-5">
                <Oval strokeWidth={3} visible={true} height="100" width="100" color="rgb(3 105 161)" secondaryColor="rgb(239 246 255)" ariaLabel="oval-loading" wrapperStyle={{}} wrapperClass="" />
                <p className="text-white text-2xl font-bold">Loading...</p>
            </div>
        </div>
    ) : null;
};

export default Loading;
