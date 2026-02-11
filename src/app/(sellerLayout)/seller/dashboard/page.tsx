import { SellerDashboard } from "@/components/seller/SellerDashboard";
import { sellerService } from "@/services/seller.service";
import { Package } from "lucide-react";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
    const res = await sellerService.getDashboardData();
    if (!res.data) {
        throw new Error("Data retrived faild");
    }
    if (!res.data.ok) {
        throw new Error(res.data.message);
    }

    if (res.data.data.length === 0) {
        return (
            <div className="h-full w-full flex justify-center items-center flex-col text-muted-foreground">
                <Package className="w-20 h-20" />
                <h1>You have no order yet</h1>
            </div>
        )
    }
    return <SellerDashboard dashboardData={res.data.data} />
}