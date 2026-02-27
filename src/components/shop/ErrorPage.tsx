"use client"

import { AlertTriangle, Home, RefreshCcw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface ErrorPageProps {
    title?: string
    message?: string
    statusCode?: number
    showHomeButton?: boolean
    showBackButton?: boolean
    showRefreshButton?: boolean
    onRetry?: () => void
}

export function ErrorPage({
    title = "Something went wrong",
    message = "We encountered an unexpected error. Please try again later.",
    statusCode,
    showHomeButton = true,
    showBackButton = true,
    showRefreshButton = true,
    onRetry,
}: ErrorPageProps) {
    const router = useRouter()

    const handleRefresh = () => {
        if (onRetry) {
            onRetry()
        } else {
            window.location.reload()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-muted/50 to-background">
            <Card className="w-full max-w-md">
                <CardContent className="pt-8 pb-6">
                    <div className="flex flex-col items-center text-center">
                        {/* Error Icon */}
                        <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
                            <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
                        </div>

                        {/* Status Code */}
                        {statusCode && (
                            <div className="text-6xl font-bold text-red-600 dark:text-red-400 mb-2">
                                {statusCode}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-2xl font-bold mb-3">{title}</h1>

                        {/* Message */}
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            {message}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                            {showBackButton && (
                                <Button onClick={() => router.back()} variant="ghost" className="flex-1" size="lg">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Go Back
                                </Button>
                            )}
                            {showRefreshButton && (
                                <Button onClick={handleRefresh} className="flex-1" size="lg">
                                    <RefreshCcw className="h-4 w-4 mr-2" />
                                    Try Again
                                </Button>
                            )}

                            {showHomeButton && (
                                <Button onClick={() => router.push("/")} variant="outline" className="flex-1" size="lg">
                                    <Home className="h-4 w-4 mr-2" />
                                    Go Home
                                </Button>
                            )}


                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}