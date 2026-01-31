"use client"

import { MedicineSearchBar } from "@/components/shop/MedicineSearchBar";

export default function Shop() {
    const handleSearch = (value: any) => {
        console.log(value);
    }
    return (
        <div>
            <MedicineSearchBar onSearch={handleSearch} />
        </div>
    );
}