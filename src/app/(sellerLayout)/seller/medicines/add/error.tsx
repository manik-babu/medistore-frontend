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
        <div>
            <h1>{error.message}</h1>
        </div>
    );
}