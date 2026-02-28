"use client"

import { getMedicines } from "@/actions/seller.actions";
import { useState } from "react";
import { Searchbar } from "./Searchbar";
import MedicineContainer from "./MedicineContainer";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ErrorPage } from "@/components/ErrorPage";

export default function MainMedicine() {
    const [medicines, setMedicines] = useState<any>();
    const [Error, setError] = useState<string | null>(null);
    const handleSearch = async (value: any) => {
        const { data, error } = await getMedicines(value);
        if (error) {
            setError(error);
        }
        if (!data.ok) {
            toast.error(data.message);
            return;
        }
        setMedicines(data.data);
    }
    if (Error) {
        return <ErrorPage message={Error} />
    }
    return (
        <div className="px-4">
            <h1 className="text-2xl mt-4">List of your all medicines</h1>
            <Searchbar onSearch={handleSearch} metaData={medicines?.meta} />
            <MedicineContainer medicines={medicines} />
            <Toaster position="top-center" />
        </div>
    );
}