import { env } from "@/env";
import { cookies } from "next/headers"


const getSession = async () => {
    try {
        const cookieStore = await cookies();

        const session = await fetch(`${env.BACKEND_URL}/api/auth/get-session`, {
            headers: {
                Cookie: cookieStore.toString()
            }
        }).then(res => res.json());
        if (!session) {
            return { data: null, error: { message: "Session not found" } }
        }
        else {
            return { data: session.user, error: null };
        }
    } catch (error) {
        return { data: null, error: error }
    }


}
const getUserDetails = async () => {
    try {
        const cookieStore = await cookies();

        const result = await fetch(`${env.BACKEND_URL}/api/user/profile`, {
            headers: {
                Cookie: cookieStore.toString()
            },
            cache: 'no-store'
        }).then(res => res.json());
        if (!result.ok) {
            return { data: null, error: "Something went wrong!" }
        }
        else {
            return { data: result.data, error: null };
        }
    } catch (error) {
        return { data: null, error: "Internal server error" }
    }
}

export const userService = {
    getSession,
    getUserDetails,
}