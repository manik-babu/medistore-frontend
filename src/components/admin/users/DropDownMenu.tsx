"use client"

import { Eye } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Ban } from "lucide-react"
import { useRouter } from 'next/navigation'
import { updateUser } from '@/actions/admin.actions'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setAdminUserData } from '@/redux/slice/userAdminSlice'

type UserDropdownMenuProps = {
    user: {
        id: string;
        isBanned: boolean;
    }
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
    const userData = useAppSelector(state => state.adminUser);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const handleBanned = async () => {
        let ts;
        try {
            ts = toast.loading("Updating");
            const res = await updateUser(user.id, !user.isBanned);
            if (!res.data) {
                toast.error(res.error, { id: ts });
                return;
            }
            if (res.data.ok) {
                toast.success(res.data.message, { id: ts });
                const filteredData = userData.data.filter((user) => user.id !== res.data.data.id);
                dispatch(setAdminUserData({
                    meta: userData.meta,
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
                    <DropdownMenuItem onClick={() => router.push(`/admin/users/${user.id}`)}><Eye /> Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleBanned} variant={"destructive"}><Ban /> {user.isBanned ? "Restore User" : "Ban User"}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Toaster position='top-center' swipeDirections={["right", "left", "top"]} />
        </>
    )
}
