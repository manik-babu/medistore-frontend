"use server"

import { shopService } from "@/services/shop.service"


export const getCategories = async () => {
    return await shopService.getCategories();
}
export const getMedicines = async (data: { searchText: string; category: string; sortBy: string, page: number }) => {
    return await shopService.getMedicines(data);
}

export const getMedicineById = async (medicineId: string) => {
    return await shopService.getMedicineById(medicineId);
}