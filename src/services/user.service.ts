import { env } from "@/env";
import { OrderData } from "@/types";
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
const addToCart = async (medicineId: string, quantity: number) => {
    try {
        const cookieStore = await cookies();

        const response = await fetch(`${env.BACKEND_URL}/api/carts`, {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                medicineId,
                quantity,
            }),
        }).then(res => res.json());

        return {
            data: response,
            error: null
        }
    } catch (error) {
        return { data: null, error: "Internal server error" }
    }
}
const getCarts = async () => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/api/carts`, {
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

const deleteCart = async (cartId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${env.BACKEND_URL}/api/carts/${cartId}`, {
            method: "DELETE",
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
const updateCartQuantity = async (cartId: string, quantity: number) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.BACKEND_URL}/api/carts/${cartId}`, {
            method: "PATCH",
            headers: {
                Cookie: cookieStore.toString(),
                "content-type": "application/json"
            },
            cache: 'no-store',
            body: JSON.stringify({ quantity })
        }).then(res => res.json());

        return { data: res, error: null };

    } catch (error) {
        return {
            data: null,
            error: "Somthing went wrong"
        }
    }
}

const placeOrder = async (data: OrderData) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.BACKEND_URL}/api/orders`, {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString(),
                "content-type": "application/json"
            },
            cache: 'no-store',
            body: JSON.stringify(data)
        }).then(res => res.json());

        return { data: res, error: null };

    } catch (error) {
        return {
            data: null,
            error: "Somthing went wrong"
        }
    }
}


export const userService = {
    getSession,
    getUserDetails,
    addToCart,
    getCarts,
    deleteCart,
    updateCartQuantity,
    placeOrder,
}