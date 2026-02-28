import { ErrorPage } from "@/components/ErrorPage";
import OrderCard from "@/components/orders/OrderCard";
import { OrderCarts } from "@/components/orders/OrderCarts";
import { CardTitle } from "@/components/ui/card";
import { userService } from "@/services/user.service";

export default async function OrderDetails({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const res = await userService.getSingleOrder(orderId);
    if (!res.data) {
        throw new Error(res.error);
    }
    if (!res.data.ok) {
        return <ErrorPage message={res.data.message} statusCode={res.data.status} />
    }
    const { carts, ...order } = res.data.data;
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl flex flex-col gap-4">
            <CardTitle className="text-2xl">Order Details</CardTitle>
            <OrderCarts carts={carts} />
            <OrderCard order={order} showDetails={false} />
        </div>
    );
}