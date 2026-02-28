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

type BanMedicineProps = { setData: Dispatch<SetStateAction<MedicineData>>, medicineId: string, isFeatured: boolean }
export default function FeaturedMedicine({ setData, medicineId, isFeatured }: BanMedicineProps) {
    const [featured, setFeatured] = useState(isFeatured);
    const [banning, setBanning] = useState(false)

    const session = useAppSelector((state) => state.user);
    const handleFeatured = async () => {
        let ts;
        setBanning(true);
        try {
            ts = toast.loading("Updating medicine");
            const res = await updateMedicine(medicineId, { isFeatured: !featured });
            if (!res.data) {
                toast.error(res.error, { id: ts });
                return;
            }
            if (res.data.ok) {
                setFeatured(res.data.data.isFeatured)
                toast.success(res.data.message, { id: ts });
                setData(prev => ({
                    medicine: { ...prev.medicine, isFeatured: res.data.data.isFeatured },
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
                <Button onClick={handleFeatured} variant={"destructive"} disabled={banning} className="w-fit"><Ban /> {featured ? "Remove from Featured" : "Add to Featured"}</Button>
                <Toaster position="top-center" />
            </div>
        );
    }
    else {
        return null;
    }
}