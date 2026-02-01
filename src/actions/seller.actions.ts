"use server"

import { sellerService } from "@/services/seller.service";

export const getMedicines = async (data: { searchText: string; categoryId: string; sortBy: string; page: number | string }) => {
    return await sellerService.getMedicines(data);
}