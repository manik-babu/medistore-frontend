"use client"

import { Ban } from "lucide-react";
import { Button } from "./button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateMedicine, updateUser } from "@/actions/admin.actions";
import { Toaster } from "./sonner";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/constants/userRole";
import { MedicineData } from "@/types/medicine";

type BanMedicineProps = { setData: Dispatch<SetStateAction<MedicineData>>, medicineId: string, isBanned: boolean }
export default function BanMedicine({ setData, medicineId, isBanned }: BanMedicineProps) {
    const [banned, setBanned] = useState(isBanned);
    const [banning, setBanning] = useState(false)

    const session = useAppSelector((state) => state.user);
    const handleBanned = async () => {
        let ts;
        setBanning(true);
        try {
            ts = toast.loading("Updating medicine");
            const res = await updateMedicine(medicineId, { isBanned: !banned });
            if (!res.data) {
                toast.error(res.error, { id: ts });
                return;
            }
            if (res.data.ok) {
                setBanned(res.data.data.isBanned)
                toast.success(res.data.message, { id: ts });
                setData(prev => ({
                    medicine: { ...prev.medicine, isBanned: res.data.data.isBanned },
                    ratings: { ...prev.ratings }
                }))
            }
            else {
                toast.error(res.data.message, { id: ts });
            }
        } catch (error: any) {
            toast.error(error.message, { id: ts });
        }
        finally {
            setBanning(false);
        }
    }
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (mounted && session && session.role === UserRole.ADMIN) {
        return (
            <div>
                <Button onClick={handleBanned} variant={"destructive"} disabled={banning} className="w-fit"><Ban /> {banned ? "Restore Medicine" : "Ban Medicine"}</Button>
                <Toaster position="top-center" />
            </div>
        );
    }
    else {
        return null;
    }
}