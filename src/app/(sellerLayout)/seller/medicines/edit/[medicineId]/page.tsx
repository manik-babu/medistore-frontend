import EditMedicine from "@/components/seller/medicines/EditMedicine";
import { shopService } from "@/services/shop.service";

export default async function MedicineEdit({ params }: { params: Promise<{ medicineId: string }> }) {
    const { medicineId } = await params;

    const { data, error } = await shopService.getMedicineById(medicineId);
    if (error) {
        throw new Error(error);
    }

    if (!data.ok) {
        throw new Error(data.message);
    }
    console.log(data.data.medicine)
    return (
        <div>
            <EditMedicine medicine={data.data.medicine} />
        </div>
    );
}