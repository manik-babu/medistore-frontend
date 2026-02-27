"use server"

import { adminService } from "@/services/admin.service"

export const addCategory = async (name: string) => {
    return await adminService.addCategory(name);
}
export const getStatics = async () => {
    return await adminService.getStatics();
}