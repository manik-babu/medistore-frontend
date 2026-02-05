"use client"

import { getMedicines } from "@/actions/seller.actions";
import { useState } from "react";
import { Searchbar } from "./Searchbar";
import MedicineContainer from "./MedicineContainer";

export default function MainMedicine() {
    const [medicines, setmedicines] = useState<any>();
    const handleSearch = async (value: any) => {
        const { data, error } = await getMedicines(value);
        if (error) {
            console.log(error)
            throw new Error("Something went wrong");
        }
        setmedicines(data.data);
    }
    return (
        <div className="px-4">
            <h1 className="text-2xl mt-4">List of your all medicines</h1>
            <Searchbar onSearch={handleSearch} metaData={medicines?.meta} />
            <MedicineContainer medicines={medicines} />

        </div>
    );
}