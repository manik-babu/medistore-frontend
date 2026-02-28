"use client"

import { Ban } from "lucide-react";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateUser } from "@/actions/admin.actions";
import { Toaster } from "./sonner";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/constants/userRole";

export default function BanUser({ userId, isBanned }: { userId: string, isBanned: boolean }) {
    const [banned, setBanned] = useState(isBanned);

    const session = useAppSelector((state) => state.user);
    const handleBanned = async () => {
        let ts;
        try {
            ts = toast.loading("Updating");
            const res = await updateUser(userId, !banned);
            if (!res.data) {
                toast.error(res.error, { id: ts });
                return;
            }
            if (res.data.ok) {
                toast.success(res.data.message, { id: ts });
                setBanned(res.data.data.isBanned)
            }
            else {
                toast.error(res.data.message, { id: ts });
            }
        } catch (error: any) {
            toast.error(error.message, { id: ts });
        }
    }
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (mounted && session && session.role === UserRole.ADMIN) {
        return (
            <div>
                <Button onClick={handleBanned} variant={"destructive"} className="w-fit"><Ban /> {banned ? "Restore User" : "Ban User"}</Button>
                <Toaster position="top-center" />
            </div>
        );
    }
    else {
        return null;
    }
}