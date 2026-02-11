import { Card, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface CartItem {
    id: string
    quantity: number
    medicine: {
        id: string
        name: string
        price: string
    }
}
export function OrderCarts({ carts }: { carts: CartItem[] }) {

    return (
        <Card className="p-4">
            <CardTitle>Medicines</CardTitle>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Name</TableHead>
                        <TableHead >Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {carts.map((cart: CartItem) => (
                        <TableRow key={cart.id}>
                            <TableCell className="font-medium">
                                {cart.medicine.name}
                            </TableCell>
                            <TableCell className="font-medium">
                                {cart.quantity}
                            </TableCell>
                            <TableCell className="text-right">{cart.medicine.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
