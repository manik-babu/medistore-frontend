"use client"
import { Order, OrderStatus } from "@/types";
import { MapPin, Phone, User, Calendar, DollarSign } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react";
import { cancelOrder } from "@/actions/user.action";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { Spinner } from "../ui/spinner";
export default function OrderCard({ order, showDetails = true }: { order: Order; showDetails?: boolean }) {

    const [loading, setLoading] = useState(false)

    const getStatusColor = (status: string) => {
        switch (status.toUpperCase()) {
            case "PROCESSING":
                return "bg-blue-500"
            case "SHIPPED":
                return "bg-purple-500"
            case "DELIVERED":
                return "bg-green-500"
            case "CANCELLED":
                return "bg-red-500"
            default:
                return "bg-gray-500"
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const handleCancelOrder = async () => {
        try {
            setLoading(true);
            const res = await cancelOrder(order.id);

            if (!res.data) {
                toast.error(res.error);
                return;
            }
            if (!res.data.ok) {
                toast.error(res.data.message);
                return;
            }
            else {
                toast.success(res.data.message);
                order.status = OrderStatus.CANCELLED;
            }

        } catch (error: any) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(order.createdAt)}
                        </CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                        {order.status}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Customer Details */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Customer Name</p>
                                <p className="text-sm text-muted-foreground">{order.name}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Phone Number</p>
                                <p className="text-sm text-muted-foreground">{order.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Address & Price */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Delivery Address</p>
                                <p className="text-sm text-muted-foreground">{order.address}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-medium">Total Price</p>
                                <p className="text-lg font-bold text-primary">
                                    BDT {order.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Actions */}
                <div className="flex gap-2">
                    {
                        showDetails && <Link href={`/customer/orders/${order.id}`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer"
                            >
                                View Details
                            </Button>
                        </Link>
                    }
                    {order.status === OrderStatus.PROCESSING &&
                        <Button variant="destructive" size="sm" className="cursor-pointer" disabled={loading} onClick={handleCancelOrder}>
                            {
                                loading ? <>Canceling <Spinner /></> : <>Cancel Order</>
                            }
                        </Button>
                    }
                </div>
            </CardContent>
            <Toaster position="top-center" />
        </Card>
    );
}