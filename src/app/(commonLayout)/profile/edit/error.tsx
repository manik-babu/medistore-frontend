"use client"

import { useEffect } from "react";

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.log(error.message)
    }, [])
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="w-96 h-96 rounded-2xl shadow-1 border bg-red-500 text-white flex justify-center items-center">
                <h1>{error.message}</h1>
            </div>
        </div>
    );
}