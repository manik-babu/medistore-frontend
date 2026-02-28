"use client"

import { Package } from "lucide-react"
import {
    Card,
    CardContent
} from "@/components/ui/card"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import { OrderStatus } from "@/types"
import { Button } from "@/components/ui/button"
import { Order } from "@/types"
import Link from "next/link"
import OrderCard from "./OrderCard"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { getOrders } from "@/actions/seller.actions"
import { Spinner } from "@/components/ui/spinner"

type OrderData = {
    orders: Order[],
    meta: {
        total: number,
        page: number,
        limit: number,
        totalPage: number;
    }
}

export function SellerOrdersPage({ initialOrders }: { initialOrders: OrderData }) {
    const firstRender = useRef(true);
    const [orders, setorders] = useState<OrderData>(initialOrders);
    const [searchText, setsearchText] = useState<string>("");
    const [oldestFirst, setOldestFirst] = useState(false);
    const [orderStatus, setOrderStatus] = useState<string>('ALL');
    const [pageLoading, setPageLoading] = useState(false);

    const handleSearch = useCallback(({ onScrolled }: { onScrolled: boolean }) => {
        fetchOrders(searchText, orderStatus, oldestFirst, 1, onScrolled);
    }, [orderStatus, oldestFirst, searchText]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        handleSearch({ onScrolled: false });
    }, [orderStatus, oldestFirst])

    const fetchOrders = async (searchText: string, orderStatus: string, oldestFirst: boolean, page: number, onScrolled: boolean) => {
        try {
            const res = await getOrders({
                searchText,
                status: orderStatus,
                oldestFirst,
                page
            });
            if (!res.data) {
                toast.error(res.error || "Unable to load orders!")
                return;
            }
            if (!res.data.ok) {
                toast.error(res.data.message)
                return;
            }
            if (onScrolled)
                setorders({ orders: [...orders.orders, ...res.data.data.orders], meta: { ...res.data.data.meta } });
            else {
                setorders(res.data.data);
            }
        } catch (error: any) {
            toast.error(error.message || "Unable to load orders!");
        }
    }

    // Trigger search when Enter is pressed
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch({ onScrolled: false })
        }
    }

    const handlePage = async () => {
        if (orders.meta.page === orders.meta.totalPage) return;
        setPageLoading(true);
        await fetchOrders(searchText, orderStatus, oldestFirst, orders.meta.page + 1, true);
        setPageLoading(false);


    }

    return (
        <div className="container px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Shop Orders</h1>
                <p className="text-muted-foreground">
                    {orders.orders.length} {orders.orders.length === 1 ? "order" : "orders"} in total
                </p>
            </div>
            {/* Main Search Bar */}
            <Card className="flex items-center flex-col gap-2 p-4 w-full mb-4">
                {/* Search Input */}
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for orders by id, name, phone, address..."
                        value={searchText}
                        onChange={(e) => setsearchText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-10 h-11"
                    />
                    {searchText && (
                        <button
                            onClick={() => setsearchText("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="flex gap-4 w-full">
                    <Select value={orderStatus} onValueChange={(value) => setOrderStatus(value)}>
                        <SelectTrigger className={`select-trigger w-fit h-9! cursor-pointer`} >
                            <SelectValue placeholder="Tap to select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={"ALL"}>
                                ALL ORDERS
                            </SelectItem>
                            <SelectItem value={OrderStatus.PROCESSING}>
                                {OrderStatus.PROCESSING}
                            </SelectItem>
                            <SelectItem value={OrderStatus.SHIPPED}>
                                {OrderStatus.SHIPPED}
                            </SelectItem>
                            <SelectItem value={OrderStatus.DELIVERED}>
                                {OrderStatus.DELIVERED}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldLabel className="w-36! flex justify-center">
                        <Field orientation="horizontal" className="py-0! px-4 flex! justify-center items-center cursor-pointer">
                            <Checkbox checked={oldestFirst} onCheckedChange={() => setOldestFirst(!oldestFirst)} id="toggle-checkbox" name="oldest-first" />
                            <FieldContent>
                                <FieldTitle>Oldest First</FieldTitle>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                </div>
            </Card>

            {
                orders.orders.length === 0 ?

                    <div className="container mx-auto px-4 py-8 max-w-4xl">
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-16">
                                <Package className="h-16 w-16 text-muted-foreground mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No orders</h3>
                            </CardContent>
                        </Card>
                    </div>
                    :
                    <div className="space-y-4">
                        {orders.orders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                        <div className="w-full flex justify-center items-center">
                            {
                                orders.meta.page === orders.meta.totalPage ?
                                    <h1>No more orders</h1>
                                    :

                                    <Button variant={"outline"} disabled={pageLoading} className="cursor-pointer" onClick={handlePage}>
                                        {
                                            pageLoading ? <>Loading <Spinner /></> : <>Show More</>
                                        }
                                    </Button>

                            }
                        </div>
                    </div>

            }

            <Toaster position="top-center" />
        </div>
    )
}
