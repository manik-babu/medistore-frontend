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

export type AddMedicineProps = {
    image: File;
    name: string;
    description: string;
    categoryId: string;
    price: number;
}

const addMedicine = async (data: AddMedicineProps) => {
    try {
        const formData = new FormData();

        formData.append("image", data.image);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("categoryId", data.categoryId);
        formData.append("price", data.price.toString());
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/seller/medicines`, {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString()
            },
            body: formData
        }).then(res => res.json());
        return {
            data: res,
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: error
        }
    }
}

const deleteMedicine = async (medicineId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/seller/medicines/${medicineId}`, {
            method: "DELETE",
            headers: {
                Cookie: cookieStore.toString()
            },
            next: {
                tags: ["seller_medicine"]
            }
        }).then(res => res.json());
        return {
            data: res,
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: error
        }
    }
}

export const sellerService = {
    getMedicines,
    addMedicine,
    deleteMedicine,
}