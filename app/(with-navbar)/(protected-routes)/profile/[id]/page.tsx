'use client';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectAuth } from '@/lib/redux/slices/auth';
import Image from 'next/image';
import React from 'react';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => {
    const { avatar, userName } = useAppSelector(selectAuth);

    return (
        <div className="w-full grid grid-rows-4 grid-cols-3 gap-4 text-center">
            <div>
                <Image className="rounded-lg" src={`https://i.pravatar.cc/300`} alt={`${userName}_profile_photo`} width={150} height={150} />
                <p className="text-center">{userName}</p>
            </div>
            dada
            <div className="col-span-2 ...">2</div>
        </div>
    );
};

export default ProfilePage;
