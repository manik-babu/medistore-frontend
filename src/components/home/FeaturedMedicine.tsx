"use client"

import { getFeaturedMedicines } from "@/actions/shop.actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MedicineProductCard } from "../shop/MedicineProductCard";
import { PageLoader } from "../ui/Loader";

export default function FeaturedMedicine() {
    const [medicines, setMedicines] = useState([])
    const [fetching, setFetching] = useState(false);
    const fetchMedicine = async () => {
        setFetching(true);
        try {
            const res = await getFeaturedMedicines();
            if (res.error) {
                toast.error(res.error);
                return;
            }
            if (!res.data.ok) {
                toast.error(res.data.message);
            }
            else {
                setMedicines(res.data.data);
            }
        } catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setFetching(false);
        }
    }
    useEffect(() => {
        fetchMedicine();
    }, [])
    if (fetching) {
        return <PageLoader message="Loading medicines" />
    }
    return (
        <div className="md:mx-[5vw] mx-4 my-8">
            <h1 className="text-3xl font-bold w-full text-center my-8">Featured Medicines</h1>
            <div id="featured">
                {medicines.length === 0 ?
                    <h1 className="text-muted-foreground w-full text-center h-72 mt-20">No medicine found</h1>
                    :
                    medicines.map((medicine: any) => (
                        <MedicineProductCard key={medicine.id} product={medicine} />
                    ))
                }
            </div>
        </div>
    );
}