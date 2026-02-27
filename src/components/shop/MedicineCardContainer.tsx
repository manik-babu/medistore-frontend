import { MedicineProductCard } from "./MedicineProductCard";

export default function MedicineCardContainer({ medicines }: { medicines: any }) {
    return (
        <div className="mt-4" id="medicine-card-container">

            {medicines.length === 0 ?
                <h1 className="text-muted-foreground w-full text-center h-72 mt-20">No medicine found</h1>
                :
                medicines.map((medicine: any) => (
                    <MedicineProductCard key={medicine.id} product={medicine} />
                ))
            }
        </div>
    );
}