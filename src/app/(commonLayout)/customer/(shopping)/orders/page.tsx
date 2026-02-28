import { ErrorPage } from "@/components/ErrorPage";
import { MyOrdersPage } from "@/components/orders/MyOrdersPage"
import { userService } from "@/services/user.service"

export const dynamic = "force-dynamic"
export default async function Orders() {

    const res = await userService.getOrders();
    if (!res.data) {
        throw new Error(res.data.error);
    }
    if (!res.data.ok) {
        return <ErrorPage message={res.data.message} statusCode={res.data.status} />
    }

    return <MyOrdersPage orders={res.data.data} />
}