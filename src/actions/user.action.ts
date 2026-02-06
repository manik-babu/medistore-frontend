"use server"

import { userService } from "@/services/user.service"

export const getSession = async () => {
    return await userService.getSession();
}

export const addToCart = async (medicineId: string, quantity: number) => {
    return await userService.addToCart(medicineId, quantity);
}
export const getUserDetails = async () => {
    return await userService.getUserDetails();
}