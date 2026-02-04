"use server"

import { AddMedicineProps, sellerService } from "@/services/seller.service";
import { revalidateTag, updateTag } from "next/cache";

export const getMedicines = async (data: { searchText: string; categoryId: string; sortBy: string; page: number | string }) => {
    return await sellerService.getMedicines(data);
}

export const addMedicine = async (data: AddMedicineProps) => {
    return await sellerService.addMedicine(data);
}

export const deleteMedicine = async (medicineId: string) => {
    revalidateTag("seller_medicine", "max");
    return await sellerService.deleteMedicine(medicineId);
}