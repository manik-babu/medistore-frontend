"use client"

import { Package, Truck, CheckCircle2, XCircle, TrendingUp, ShoppingBag } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DashboardData {
  _count: number
  status: string
}

export function SellerDashboard({ dashboardData }: { dashboardData: DashboardData[] }) {

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case "PROCESSING":
        return Package
      case "SHIPPED":
        return Truck
      case "DELIVERED":
        return CheckCircle2
      default:
        return ShoppingBag
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "PROCESSING":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
      case "SHIPPED":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400"
      case "DELIVERED":
        return "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const totalOrders = dashboardData.reduce((sum, item) => sum + item._count, 0);
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your store's order statistics
        </p>
      </div>

      {/* Total Orders Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Total Orders
              </p>
              <p className="text-4xl font-bold">{totalOrders}</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardData.map((item) => {
          const Icon = getStatusIcon(item.status)
          const colorClass = getStatusColor(item.status)
          const percentage = totalOrders > 0 ? ((item._count / totalOrders) * 100).toFixed(1) : 0

          return (
            <Card key={item.status} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {item.status.toLowerCase()}
                </CardTitle>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{item._count}</div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${colorClass.replace('text-', 'bg-').split(' ')[0]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {percentage}%
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Detailed breakdown of your orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData.map((item) => {
              const Icon = getStatusIcon(item.status)
              const percentage = totalOrders > 0 ? ((item._count / totalOrders) * 100).toFixed(1) : 0

              return (
                <div key={item.status} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium capitalize">{item.status.toLowerCase()}</p>
                      <p className="text-sm text-muted-foreground">{percentage}% of total orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{item._count}</p>
                    <p className="text-xs text-muted-foreground">orders</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
