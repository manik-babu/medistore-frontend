import { ErrorPage } from "@/components/ErrorPage";
import { MedicineDetailsPage } from "@/components/shop/MedicineDetailsPage";
import { shopService } from "@/services/shop.service";

export default async function MedicineDetails({ params }: { params: Promise<{ medicineId: string }> }) {
    const { medicineId } = await params;
    const res = await shopService.getMedicineById(medicineId);
    if (!res.data) {
        throw new Error(res.error);
    }

    if (!res.data.ok) {
        return <ErrorPage
            statusCode={res.data.status}
            title="Not Found"
            message={res.data.message}
        // message="The page you're looking for doesn't exist."
        />
    }

    return (
        <div>
            <MedicineDetailsPage data={res.data.data} />
        </div>
    );
}