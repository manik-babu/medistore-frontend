import { env } from "@/env";
import { OrderData } from "@/types";
import { cookies } from "next/headers"

const BACKEND_URL = env.BACKEND_URL;

const getSession = async () => {
    try {
        const cookieStore = await cookies();

        const session = await fetch(`${BACKEND_URL}/api/auth/get-session`, {
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

        const result = await fetch(`${BACKEND_URL}/api/user/profile`, {
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

        const response = await fetch(`${BACKEND_URL}/api/carts`, {
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

        const res = await fetch(`${BACKEND_URL}/api/carts`, {
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

        const res = await fetch(`${BACKEND_URL}/api/carts/${cartId}`, {
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
        const res = await fetch(`${BACKEND_URL}/api/carts/${cartId}`, {
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
        const res = await fetch(`${BACKEND_URL}/api/orders`, {
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

const getOrders = async () => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/orders`, {
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

const cancelOrder = async (orderId: string) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
            method: "PATCH",
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

const getSingleOrder = async (orderId: string) => {
    try {
        const cookieStore = await cookies();

        const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
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

const verifyEmail = async (token: string) => {
    try {
        const res = fetch(`${BACKEND_URL}/api/auth/verify-email?token=${token}`).then(res => res.json());
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
const changeRole = async (storeName: string) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${BACKEND_URL}/api/user/change-role`, {
            method: "PATCH",
            headers: {
                Cookie: cookieStore.toString(),
                "content-type": "application/json"
            },
            cache: 'no-store',
            body: JSON.stringify({
                storeName
            })
        }).then(res => res.json());

        return { data: res, error: null };

    } catch (error) {
        return {
            data: null,
            error: "Role update failed"
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
    getOrders,
    cancelOrder,
    getSingleOrder,
    verifyEmail,
    changeRole,
}