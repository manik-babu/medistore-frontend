"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from "recharts"
import { Users, Store, Pill, ShoppingCart } from "lucide-react"
import { useTheme } from "next-themes"
import { AdminStatics } from "@/types/admin"

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
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Order Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderChartData} barCategoryGap={30}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="hsl(var(--border))"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="name"
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: theme == "dark" ? "#fff" : "hsl(var(--primary))" }}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    stroke="hsl(var(--muted-foreground))"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: theme == "dark" ? "#fff" : "hsl(var(--primary))" }}
                                />

                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-xl border bg-card px-4 py-2 shadow-lg">
                                                    <p className="text-sm font-medium text-muted-foreground">
                                                        {label}
                                                    </p>
                                                    <p className="text-lg font-bold text-foreground">
                                                        {payload[0].value} Orders
                                                    </p>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />

                                <Bar
                                    dataKey="value"
                                    // fill="hsl(var(--primary))"
                                    fill={theme == "dark" ? "#fff" : "hsl(var(--primary))"}
                                    radius={[12, 12, 0, 0]}
                                    animationDuration={800}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Users Pie Chart */}
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userChartData}
                                    dataKey="total"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >
                                    {userChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
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
