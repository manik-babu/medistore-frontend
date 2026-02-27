"use client";

import { ErrorPage } from "@/components/shop/ErrorPage";

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <ErrorPage
            message={error.message}
            statusCode={500}
            onRetry={reset}
        />
    )
}