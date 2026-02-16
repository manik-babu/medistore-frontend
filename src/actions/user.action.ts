"use server"

import { userService } from "@/services/user.service"
import { OrderData } from "@/types";

export const getSession = async () => {
    return await userService.getSession();
}

export const addToCart = async (medicineId: string, quantity: number) => {
    return await userService.addToCart(medicineId, quantity);
}
export const getUserDetails = async () => {
    return await userService.getUserDetails();
}

export const getCarts = async () => {
    return await userService.getCarts();
}

export const deleteCart = async (cartId: string) => {
    return await userService.deleteCart(cartId);
}

export const updateCartQuantity = async (cartId: string, quantity: number) => {
    return await userService.updateCartQuantity(cartId, quantity)
}
export const placeOrder = async (data: OrderData) => {
    return await userService.placeOrder(data);
}
export const cancelOrder = async (orderId: string) => {
    return await userService.cancelOrder(orderId);
}
export const emailVerify = async (token: string) => {
    return await userService.verifyEmail(token);
}