import { ErrorPage } from "@/components/ErrorPage";
import { SellerOrdersPage } from "@/components/seller/order/SellerOrderPage";
import { Card, CardContent } from "@/components/ui/card";
import { sellerService } from "@/services/seller.service";
import { Package } from "lucide-react";
export const dynamic = "force-dynamic"
export default async function Orders() {
    const res = await sellerService.getOrders({
        searchText: "",
        status: "ALL",
        oldestFirst: false,
        page: 1
    });
    if (!res.data) {
        throw new Error(res.data.error);
    }
    if (!res.data.ok) {
        return <ErrorPage message={res.data.message} statusCode={res.data.status} />
    }
    if (res.data.data.orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Package className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return <SellerOrdersPage initialOrders={res.data.data} />
}