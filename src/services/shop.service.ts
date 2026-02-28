import { env } from "@/env"


const BACKEND_URL = env.BACKEND_URL;
const getCategories = async () => {
    try {

        const data = await fetch(`${BACKEND_URL}/api/categories`).then(res => res.json());

        return {
            data,
            error: null
        }

    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}
const getMedicines = async ({ searchText, category, sortBy, page }: { searchText: string; category: string; sortBy: string, page: number }) => {
    try {
        const url = new URL(`${BACKEND_URL}/api/medicines`);
        url.searchParams.append("searchText", searchText);
        url.searchParams.append("category", category);
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("page", page.toString());

        const data = await fetch(url.toString(), {
            cache: "no-store"
        }).then(res => res.json());

        return {
            data,
            error: null
        }
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}

const getMedicineById = async (medicineId: string) => {
    try {
        const url = new URL(`${BACKEND_URL}/api/medicines/${medicineId}`);

        const data = await fetch(url.toString(), {
            cache: "no-store"
        }).then(res => res.json());

        return {
            data,
            error: null
        }
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}
const getFeaturedMedicines = async () => {
    try {
        const url = new URL(`${BACKEND_URL}/api/featured`);

        const data = await fetch(url.toString(), {
            cache: "no-store"
        }).then(res => res.json());

        return {
            data,
            error: null
        }
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}
export const shopService = {
    getCategories,
    getMedicines,
    getMedicineById,
    getFeaturedMedicines,
}