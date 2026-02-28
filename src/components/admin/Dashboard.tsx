"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Store, Pill, ShoppingCart } from "lucide-react"
import { useTheme } from "next-themes"
import { AdminStatics } from "@/types/admin"
import { ChartBarLabel } from "./BarChart"
import { ChartPieLabelList } from "./PieChart"

const data = {
    customer: { total: 5, banned: 0 },
    seller: { total: 4, banned: 0 },
    medicine: { total: 6, featured: 0, banned: 0 },
    order: {
        total: 9,
        processing: 2,
        shipped: 3,
        delivered: 2,
        cancelled: 2,
    },
}

const orderChartData = [
    { name: "Processing", value: data.order.processing },
    { name: "Shipped", value: data.order.shipped },
    { name: "Delivered", value: data.order.delivered },
    { name: "Cancelled", value: data.order.cancelled },
]

const userChartData = [
    { name: "Customers", total: data.customer.total },
    { name: "Sellers", total: data.seller.total },
]

type DashboardProps = {
    data: AdminStatics
}

export default function AdminDashboard({ data }: DashboardProps) {
    const { theme } = useTheme();
    return (
        <div className="p-6 space-y-6">
            {/* Top Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Customers"
                    value={data.customer.total}
                    subValue={`Banned: ${data.customer.banned}`}
                    icon={<Users className="w-6 h-6" />}
                />
                <StatsCard
                    title="Total Sellers"
                    value={data.seller.total}
                    subValue={`Banned: ${data.seller.banned}`}
                    icon={<Store className="w-6 h-6" />}
                />
                <StatsCard
                    title="Total Medicines"
                    value={data.medicine.total}
                    subValue={`Featured: ${data.medicine.featured}`}
                    icon={<Pill className="w-6 h-6" />}
                />
                <StatsCard
                    title="Total Orders"
                    value={data.order.total}
                    subValue={`Cancelled: ${data.order.cancelled}`}
                    icon={<ShoppingCart className="w-6 h-6" />}
                />
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Orders Bar Chart */}
                <ChartBarLabel data={data.order} />


                {/* Users Pie Chart */}
                <ChartPieLabelList customer={data.customer} seller={data.seller} />
            </div>
        </div>
    )
}
type StatsCardProps = {
    title: string;
    value: number;
    subValue: string;
    icon: any

};
function StatsCard({ title, value, subValue, icon }: StatsCardProps) {
    return (
        <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
                <Badge variant="secondary" className="mt-2">
                    {subValue}
                </Badge>
            </CardContent>
        </Card>
    )
}
