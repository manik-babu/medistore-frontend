"use client"

import { getMedicines } from "@/actions/shop.actions";
import { MedicineSearchBar } from "@/components/shop/MedicineSearchBar";
import { useState } from "react";
import MedicineCardContainer from "./MedicineCardContainer";

export default function MainShop() {
    const [medicines, setmedicines] = useState<any>()
    const handleSearch = async (value: any) => {
        const { data, error } = await getMedicines(value);
        if (error) {
            throw new Error("Something went wrong");
        }
        setmedicines(data.data);

    }
    return (
        <div className="flex flex-col mt-20 md:px-[5vw] px-4">
            <h1 className="font-bold text-2xl mt-4">For sale</h1>
            <MedicineSearchBar onSearch={handleSearch} />
            <MedicineCardContainer medicines={medicines} />
        </div>
    );
}