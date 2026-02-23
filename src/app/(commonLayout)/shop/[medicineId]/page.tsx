export default async function MedicineDetails({ params }: { params: Promise<{ medicineId: string }> }) {
    const { medicineId } = await params;
    return (
        <div>
            <h1>This is {medicineId} page</h1>
        </div>
    );
}