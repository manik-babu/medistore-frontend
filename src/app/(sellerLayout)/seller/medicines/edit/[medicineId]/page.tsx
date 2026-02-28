import { ErrorPage } from "@/components/ErrorPage";
import EditMedicine from "@/components/seller/medicines/EditMedicine";
import { shopService } from "@/services/shop.service";
export const dynamic = "force-dynamic"
export default async function MedicineEdit({ params }: { params: Promise<{ medicineId: string }> }) {
    const { medicineId } = await params;

    const { data, error } = await shopService.getMedicineById(medicineId);
    if (error) {
        throw new Error(error);
    }

    if (!data.ok) {
        return <ErrorPage message={data.message} statusCode={data.status} />
    }
    return (
        <div>
            <EditMedicine medicine={data.data.medicine} />
        </div>
    );
}