"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { CartItemCard } from "@/components/cart/CartItemCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteCart, getCarts } from "@/actions/user.action"
import { Toaster } from "@/components/ui/sonner"
import { useAppDispatch } from "@/redux/hooks"
import { decrement } from "@/redux/slice/cartSlice"
import Link from "next/link"

export interface CartItem {
    id: string
    quantity: number
    createdAt: string
    medicine: {
        id: string
        name: string
        imageUrl: string
        price: string
        author: {
            id: string;
            storeName: string;
        }
    }
}

interface CartPageProps {
    initialItems?: CartItem[]
}

export function CartPage({ initialItems = [] }: CartPageProps) {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
    const [loading, setLoading] = useState(false)

    // Fetch cart items on mount if not provided
    useEffect(() => {
        fetchCartItems()
    }, [])

    const fetchCartItems = async () => {
        try {
            const response = await getCarts();
            console.log(response)
            if (response.data.ok) {
                console.log({ cartPage: response.data })
                setCartItems(response.data.data);
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Failed to load cart")
        }
    }

    if (!cartItems) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-center h-96">
                    <p className="text-muted-foreground">Loading cart...</p>
                </div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center h-96 gap-4">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>
                    <p className="text-muted-foreground">Add some medicines to get started</p>
                    <Link href='/shop'>
                        <Button className="cursor-pointer">
                            Browse Medicines
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    const handleRemove = async (cartItemId: string) => {
        try {
            const response = await deleteCart(cartItemId);
            if (response.data.ok) {
                const filteredCarts = cartItems.filter((item) => item.id !== cartItemId);
                setCartItems(filteredCarts);
                dispatch(decrement());
                toast.success("Cart removed");
            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error("Error to remove item");
        }
    }
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => {
        return sum + parseFloat(item.medicine.price) * item.quantity
    }, 0)
    const totalStore = new Set();
    cartItems.forEach((item) => totalStore.add(item.medicine.author.id));

    const deliveryFee = totalStore.size * 60;
    const total = subtotal + deliveryFee;





    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-muted-foreground">
                            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
                        </p>
                    </div>

                    {cartItems.map((item) => (
                        <CartItemCard
                            key={item.id}
                            item={item}
                            setCartItems={setCartItems}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            {
                                totalStore.size > 1 &&
                                <CardDescription className="text-red-600 text-sm">Each seller’s items are ordered and delivered separately, with separate delivery fees.</CardDescription>
                            }
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-base">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">{subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between text-base">
                                <span className="text-muted-foreground">Delivery fee ({totalStore.size})</span>
                                <span className="font-medium">{deliveryFee.toFixed(2)}</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-lg">
                                <span className="font-semibold">Total</span>
                                <span className="font-bold text-primary">
                                    BDT {total.toFixed(2)}
                                </span>
                            </div>

                            <Button
                                className="w-full cursor-pointer"
                                size="lg"
                                onClick={() => router.push("/customer/checkout")}
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full cursor-pointer"
                                onClick={() => router.push("/shop")}
                            >
                                Continue Shopping
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    )
}
