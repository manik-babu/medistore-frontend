import { UpdateMedicineProps } from "@/actions/seller.actions";
import { env } from "@/env";
import { revalidateTag, updateTag } from "next/cache";
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
            next: {
                tags: ["sellerMedicine"]
            }
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

        }).then(res => res.json());
        if (res.ok) {
            updateTag("sellerMedicine");
        }
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

const updateMedicine = async (data: UpdateMedicineProps, medicineId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/seller/medicines/${medicineId}`, {
            method: "PUT",
            headers: {
                Cookie: cookieStore.toString(),
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

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
export type OrderFetch = {
    searchText: string;
    oldestFirst: boolean;
    status: string;
    page: number;
}
const getOrders = async ({ searchText, oldestFirst, status, page }: OrderFetch) => {
    try {
        const sortBy = oldestFirst ? "asc" : "desc";
        const url = new URL(`${BACKEND_URL}/api/seller/orders`);
        url.searchParams.append("searchText", searchText);
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("status", status);
        url.searchParams.append("page", page.toString());
        const cookieStore = await cookies();

        const res = await fetch(url, {
            headers: {
                Cookie: cookieStore.toString()
            },
            cache: 'no-store'
        }).then(res => res.json());

        return { data: res, error: null };

    } catch (error) {
        return {
            data: null,
            error: "Somthing went wrong"
        }
    }
}

const updateOrder = async (orderId: string, orderStatus: string) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.BACKEND_URL}/api/seller/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                Cookie: cookieStore.toString(),
                "Content-type": "application/json"
            },
            cache: 'no-store',
            body: JSON.stringify({ orderStatus })
        }).then(res => res.json());

        return { data: res, error: null };

    } catch (error) {
        return {
            data: null,
            error: "Somthing went wrong"
        }
    }
}

const getSingleOrder = async (orderId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/seller/orders/${orderId}`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString()
            },

        }).then(res => res.json());
        return {
            data: res,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}

const getDashboardData = async () => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/seller/dashboard`, {
            method: "GET",
            headers: {
                Cookie: cookieStore.toString()
            },

        }).then(res => res.json());
        return {
            data: res,
            error: null,
        };
    } catch (error: any) {
        return {
            data: null,
            error: error.message
        }
    }
}



export const sellerService = {
    getMedicines,
    addMedicine,
    deleteMedicine,
    updateMedicine,
    getOrders,
    updateOrder,
    getSingleOrder,
    getDashboardData,

}