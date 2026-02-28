import { GetUsersProps } from "@/actions/admin.actions";
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
const getUsers = async ({ searchText, role, banned, page }: GetUsersProps) => {
    try {
        const cookieStore = await cookies();

        const url = new URL("/api/admin/users", BACKEND_URL);
        url.searchParams.append("searchText", searchText);
        url.searchParams.append("role", role);
        url.searchParams.append("banned", banned);
        url.searchParams.append("page", page);


        const res = await fetch(url, {
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
const updateUser = async (userId: string, banned: boolean) => {
    try {
        const cookieStore = await cookies();

        const url = new URL(`/api/admin/users/${userId}`, BACKEND_URL);


        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                Cookie: cookieStore.toString(),
                "content-type": "application/json"
            },
            body: JSON.stringify({
                isBanned: banned
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
const getUserDetails = async (userId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/admin/users/${userId}`, {
            headers: {
                Cookie: cookieStore.toString()
            },
            cache: 'no-store'
        }).then(res => res.json());

        return { data: res, error: null }

    } catch (error: any) {
        return { data: null, error: error.message }
    }
}

const getMedicines = async ({ searchText, category, sortBy, banned, page, featured }: { banned: string, featured: string, searchText: string; category: string; sortBy: string, page: string }) => {
    try {
        const cookieStore = await cookies();

        const url = new URL(`${BACKEND_URL}/api/admin/medicines`);
        url.searchParams.append("searchText", searchText);
        url.searchParams.append("category", category);
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("page", page);
        url.searchParams.append("banned", banned);
        url.searchParams.append("featured", featured);

        const data = await fetch(url.toString(), {
            headers: {
                Cookie: cookieStore.toString()
            },
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

const updateMedicine = async (medicineId: string, data: { isFeatured?: boolean; isBanned?: boolean; }) => {
    try {
        const cookieStore = await cookies();

        const url = new URL(`/api/admin/medicines/${medicineId}`, BACKEND_URL);


        const res = await fetch(url, {
            method: "PATCH",
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
    getUsers,
    updateUser,
    getUserDetails,
    getMedicines,
    updateMedicine,
}