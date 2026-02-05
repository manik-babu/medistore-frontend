import { env } from "@/env";
import { createAuthClient } from "better-auth/react"
import { redirect } from "next/navigation";
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: `${env.NEXT_PUBLIC_FRONTEND_URL}/api/auth`
    // baseURL: "http://localhost:8080"
})

export const signInWithGoogle = async () => {
    authClient.signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_FRONTEND_URL
    });
}
export const signOut = async () => {
    authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                redirect("/login")
            },
        },
    });
}