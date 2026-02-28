"use server"

import { adminService } from "@/services/admin.service"

export const addCategory = async (name: string) => {
    return await adminService.addCategory(name);
}
export const getStatics = async () => {
    return await adminService.getStatics();
}
export type GetUsersProps = {
    searchText: string;
    role: string;
    banned: string;
    page: string
}
export const getUsers = async (data: GetUsersProps) => {
    return await adminService.getUsers(data);
}
export const updateUser = async (userId: string, banned: boolean) => {
    return await adminService.updateUser(userId, banned);
}
export const getAdminMedicines = async (data: { banned: string, searchText: string; category: string; sortBy: string, page: string, featured: string }) => {
    return await adminService.getMedicines(data);
}
export const updateMedicine = async (medicineId: string, data: { isFeatured?: boolean; isBanned?: boolean; }) => {
    return await adminService.updateMedicine(medicineId, data);
}
