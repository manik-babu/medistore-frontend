import { MyOrdersPage } from "@/components/orders/MyOrdersPage"
import { userService } from "@/services/user.service"

export const dynamic = "force-dynamic"
export default async function Orders() {

    const res = await userService.getOrders();
    if (!res.data) {
        throw new Error(res.data.error);
    }
    if (!res.data.ok) {
        throw new Error(res.data.message);
    }


    return <MyOrdersPage orders={res.data.data} />
}