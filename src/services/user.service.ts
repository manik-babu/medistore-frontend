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

export const userService = {
    getSession,
}