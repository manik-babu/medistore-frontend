"use client"

import { DropdownMenuBasic } from "@/components/ui/DropDownMenuBasic";
import { PageLoader } from "@/components/ui/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MedicineContainer({ medicines }: { medicines: any }) {

    if (!medicines) {
        return <PageLoader message="Loading medicines" />
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead ></TableHead>
                    <TableHead >Name</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {medicines && medicines.data.map((medicine: any) => (
                    <TableRow key={medicine.id}>
                        <TableCell className="w-8">
                            <DropdownMenuBasic medicine={{ medicineId: medicine.id, name: medicine.name }} />
                        </TableCell>
                        <TableCell className="font-medium">
                            {medicine.name}
                        </TableCell>
                        <TableCell>{medicine._count.carts}</TableCell>
                        <TableCell>{medicine._count.reviews}</TableCell>
                        <TableCell className="text-right">{medicine.price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}