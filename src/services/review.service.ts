import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

const getReviews = async (medicineId: string, oldestFirst: boolean, rating: string) => {
    const url = new URL(`${BACKEND_URL}/api/reviews/${medicineId}`);
    url.searchParams.append("rating", rating);
    url.searchParams.append("sortBy", oldestFirst ? "asc" : "desc");
    try {
        const res = await fetch(url).then(res => res.json());
        return {
            data: res,
            error: null
        }
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}
const deleteReview = async (reviewId: string) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}`, {
            method: "DELETE",
            headers: {
                Cookie: cookieStore.toString()
            }
        }).then(res => res.json());
        return {
            data: res,
            error: null
        }
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}
const addReview = async (data: { medicineId: string; rating: number, content: string }) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${BACKEND_URL}/api/reviews`, {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString(),
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
        return {
            data: res,
            error: null
        }
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}

export const reviewService = {
    getReviews,
    deleteReview,
    addReview,
}