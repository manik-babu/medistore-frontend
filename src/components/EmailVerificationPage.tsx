"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { emailVerify } from "@/actions/user.action"

export function EmailVerificationPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!token) {
            setStatus("error")
            setMessage("Verification token is missing")
            return
        }

        verifyEmail(token)
    }, [token])

    const verifyEmail = async (token: string) => {
        try {
            const response = await emailVerify(token);
            if (!response.data) {
                setStatus("error")
                setMessage(response.error || "Verification failed. Please try again.")
                return;
            }

            if (response) {
                setStatus("success")
                setMessage("Email verified successfully!")
            } else {
                setStatus("error")
                setMessage("Verification failed. Please try again.")
            }
        } catch (error) {
            setStatus("error")
            setMessage("Something went wrong. Please try again later.")
        }
    }

    return (
        <div className="container flex items-center justify-center min-h-screen px-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                        {status === "loading" && (
                            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto">
                                <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
                            </div>
                        )}
                        {status === "success" && (
                            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                            </div>
                        )}
                        {status === "error" && (
                            <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto">
                                <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
                            </div>
                        )}
                    </div>

                    <CardTitle className="text-2xl">
                        {status === "loading" && "Verifying Email"}
                        {status === "success" && "Email Verified!"}
                        {status === "error" && "Verification Failed"}
                    </CardTitle>
                    <CardDescription className="mt-2">{message}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {status === "success" && (
                        <>
                            <div className="rounded-lg bg-green-50 dark:bg-green-900/10 p-4 text-center">
                                <p className="text-sm text-green-800 dark:text-green-300">
                                    Your email has been verified. You can now login to your account.
                                </p>
                            </div>
                            <Button onClick={() => router.push("/login")} className="w-full" size="lg">
                                Go to Login
                            </Button>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-4 text-center">
                                <p className="text-sm text-red-800 dark:text-red-300">{message}</p>
                            </div>
                            <div className="space-y-2">
                                <Button onClick={() => router.push("/login")} variant="ghost" className="w-full cursor-pointer">
                                    Go to Login
                                </Button>
                            </div>
                        </>
                    )}

                    {status === "loading" && (
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>Verifying your email address...</span>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}