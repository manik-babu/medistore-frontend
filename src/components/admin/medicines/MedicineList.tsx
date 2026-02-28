"use client"

import { PageLoader } from "@/components/ui/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "@/types/admin";
import { Medicines } from "@/types/medicine";
import { MedicineDropdownMenu } from "./DropDownMenu";

export default function MedicineList({ medicines }: { medicines: Medicines[] }) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead ></TableHead>
                    <TableHead >Name</TableHead>
                    <TableHead>Store name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead >Purchased</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {medicines && medicines.map((medicine: Medicines) => (
                    <TableRow key={medicine.id}>
                        <TableCell className="w-8">
                            <MedicineDropdownMenu medicine={{ storeId: medicine.authorId, id: medicine.id, isBanned: medicine.isBanned, isFeatured: medicine.isFeatured }} />
                        </TableCell>
                        <TableCell className="font-medium">
                            {medicine.name}
                        </TableCell>
                        <TableCell>{medicine.author.storeName}</TableCell>
                        <TableCell>{medicine.price}</TableCell>
                        <TableCell>{medicine._count.carts}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}