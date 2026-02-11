"use client"

import { Package } from "lucide-react"
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Order } from "@/types"
import Link from "next/link"
import OrderCard from "./OrderCard"


export function MyOrdersPage({ orders }: { orders: Order[] }) {

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Link href='/shop'>
              <Button >
                Browse Medicines
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          {orders.length} {orders.length === 1 ? "order" : "orders"} in total
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
