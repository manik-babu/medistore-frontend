import { CartItem } from "@/types";
import { Card, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { FormatedDataForOrder, FormatedOrders } from "@/app/(commonLayout)/customer/checkout/page";
import AddressForm from "./AddressForm";

export default function CheckoutPage({ orders, formatedDataForOrder }: { orders: FormatedOrders; formatedDataForOrder: FormatedDataForOrder }) {
    return (
        <div className="flex flex-col mt-20 w-screen px-4 max-w-206 mx-auto gap-4 ">
            <CardTitle className="text-2xl">Order Summary</CardTitle>
            <CardDescription>
                Please review your items below. If everything looks correct, enter your delivery address and place your order.
            </CardDescription>
            {
                Object.entries(orders).map(([sellerId, carts]: [string, { totalPrice: number, carts: CartItem[] }]) => {
                    return <Card key={sellerId} className="p-4 gap-4">
                        <CardTitle>From {carts.carts[0].medicine.author.storeName}</CardTitle>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Name</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {carts.carts.map((cart: CartItem) => (
                                    <TableRow key={cart.id}>
                                        <TableCell className="font-medium">
                                            {cart.medicine.name}
                                        </TableCell>
                                        <TableCell className="text-right">{cart.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell className="font-bold w-full">Total = {carts.totalPrice} BDT</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Card>
                })
            }
            <AddressForm orders={formatedDataForOrder} />
        </div>
    );
}