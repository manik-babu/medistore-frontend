import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

const getMedicines = async ({ searchText, categoryId, sortBy, page }: { searchText: string; categoryId: string; sortBy: string; page: number | string }) => {
    try {
        const cookieStore = await cookies();
        const url = new URL(`${BACKEND_URL}/api/seller/medicines`);
        url.searchParams.append("searchText", searchText);
        url.searchParams.append("categoryId", categoryId);
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("page", page.toString());

        const data = await fetch(url.toString(), {
            headers: {
                Cookie: cookieStore.toString()
            },
            cache: "no-store"
        }).then(res => res.json());

        if (data.ok) {
            return {
                data,
                error: null
            }
        }
        else {
            throw new Error(data.error);
        }
    } catch (error) {
        return {
            data: null,
            error: error
        }
    }
}

export const sellerService = {
    getMedicines,
}