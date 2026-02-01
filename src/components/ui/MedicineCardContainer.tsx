import { MedicineProductCard } from "./MedicineProductCard";

export default function MedicineCardContainer({ medicines }: { medicines: any }) {
    console.log(medicines);
    return (
        <div className="px-[5vw] mt-4" id="medicine-card-container">
            {medicines &&
                medicines.data.map((medicine: any) => (
                    <MedicineProductCard key={medicine.id} product={medicine} />
                ))
            }
        </div>
    );
}