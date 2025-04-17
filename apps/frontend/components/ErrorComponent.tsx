'use client'

import Link from 'next/link';

export default function ErrorComponent({ message, code } : { message: string, code: number | null }) {
    return (
        <div className="relative h-screen">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className='flex flex-col items-center justify-center'>
                    <h2 className="text-2xl font-semibold">{code ?? "Something went wrong"}</h2>
                    <p className="mt-2 text-xl text-gray-500">{message}</p>
                </div>
                <Link href="/" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    <span>Home</span>
                </Link>
            </div>
        </div>
    );
}
