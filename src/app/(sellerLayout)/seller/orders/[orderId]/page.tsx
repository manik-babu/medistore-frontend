import OrderCard from "@/components/seller/order/OrderCard";
import { OrderCarts } from "@/components/seller/order/OrderCarts";
import { CardTitle } from "@/components/ui/card";
import { sellerService } from "@/services/seller.service";

export default async function OrderDetails({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const res = await sellerService.getSingleOrder(orderId);
    if (!res.data) {
        throw new Error(res.error);
    }
    if (!res.data.ok) {
        throw new Error(res.data.message);
    }
    const { carts, ...order } = res.data.data;
    console.log({ carts, order })
    return (
        <div className="container px-4 py-8 max-w-4xl flex flex-col gap-4">
            <CardTitle className="text-2xl">Order Details</CardTitle>
            <OrderCarts carts={carts} />
            <OrderCard order={order} showDetails={false} />
        </div>
    );
}