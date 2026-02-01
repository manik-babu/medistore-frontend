"use client"

export default function error({ error, reset }: { error: Error & { digest: true }; reset: () => void }) {
    return (
        <div>
            <h1>{error.message}</h1>
        </div>
    );
}