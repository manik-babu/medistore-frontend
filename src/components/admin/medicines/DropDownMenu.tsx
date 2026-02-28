"use client"

import { Eye, Leaf, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Ban } from "lucide-react"
import { useRouter } from 'next/navigation'
import { updateMedicine, updateUser } from '@/actions/admin.actions'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setAdminMedicineData } from '@/redux/slice/adminMedicine'

type UserDropdownMenuProps = {
    medicine: {
        id: string;
        isBanned: boolean;
        isFeatured: boolean;
        storeId: string;
    }
}

export function MedicineDropdownMenu({ medicine }: UserDropdownMenuProps) {
    const medicineData = useAppSelector(state => state.adminMedicine);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleUpdate = async (data: { isBanned?: boolean, isFeatured?: boolean }) => {
        let ts;
        try {
            ts = toast.loading("Updating");
            const res = await updateMedicine(medicine.id, data);
            if (!res.data) {
                toast.error(res.error, { id: ts });
                return;
            }
            if (res.data.ok) {
                toast.success(res.data.message, { id: ts });
                const filteredData = medicineData.data.filter((medicine) => medicine.id !== res.data.data.id);
                dispatch(setAdminMedicineData({
                    meta: medicineData.meta,
                    data: filteredData
                }));
            }
            else {
                toast.error(res.data.message, { id: ts });
            }
        } catch (error: any) {
            toast.error(error.message, { id: ts });
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push(`/shop/medicine/${medicine.id}`)}><Eye />Medicine Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/admin/users/${medicine.storeId}`)}><User /> Seller Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdate({ isFeatured: !medicine.isFeatured })} variant={"default"}><Leaf /> {!medicine.isFeatured ? "Add to Featured" : "Remove Featured"}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleUpdate({ isBanned: !medicine.isBanned })} variant={"destructive"}><Ban /> {medicine.isBanned ? "Restore Medicine" : "Ban Medicine"}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Toaster position='top-center' swipeDirections={["right", "left", "top"]} />
        </>
    )
}
