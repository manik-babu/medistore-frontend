import { env } from "@/env";
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: env.NEXT_PUBLIC_BACKEND_URL
})

export const signInWithGoogle = async () => {
    authClient.signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_FRONTEND_URL
    });
}