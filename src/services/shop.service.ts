import { env } from "@/env"


const BACKEND_URL = env.BACKEND_URL;
const getCategories = async () => {
    try {

        const data = await fetch(`${BACKEND_URL}/api/categories`).then(res => res.json());

        if (data.ok) {
            return {
                data,
                error: null
            }
        }
        else {
            return {
                data: null,
                error: data.error
            }
        }

    } catch (error) {
        return {
            data: null,
            error: "Something went wrong"
        }
    }
}
const getMedicines = async ({ searchText, categoryId, sortBy }: { searchText: string; categoryId: string; sortBy: string }) => {
    try {
        const url = new URL(`${BACKEND_URL}/api/medicines`);
        url.searchParams.append("searchText", searchText);
        url.searchParams.append("categoryId", categoryId);
        url.searchParams.append("sortBy", sortBy);

        const data = await fetch(url.toString(), {
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

const getMedicineById = async (medicineId: string) => {
    try {
        const url = new URL(`${BACKEND_URL}/api/medicines/${medicineId}`);

        const data = await fetch(url.toString(), {
            cache: "no-store"
        }).then(res => res.json());

        if (data) {
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

export const shopService = {
    getCategories,
    getMedicines,
    getMedicineById,
}