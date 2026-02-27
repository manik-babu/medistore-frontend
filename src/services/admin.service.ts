import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

const getStatics = async () => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/admin/statics`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString()
            }
        }).then(res => res.json());
        return {
            data: res,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message,
        };

    }
}
const addCategory = async (name: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/admin/category`, {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString(),
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name
            })
        }).then(res => res.json());
        return {
            data: res,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message,
        };

    }
}

export const adminService = {
    addCategory,
    getStatics,
}