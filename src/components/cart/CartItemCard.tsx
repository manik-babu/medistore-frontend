"use client"

import { Minus, Plus, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { updateCartQuantity } from "@/actions/user.action"
import { CartItem } from "./CartPage"


interface CartItemCardProps {
  item: CartItem
  setCartItems: Dispatch<SetStateAction<CartItem[] | null>>
  onRemove: (cartItemId: string) => Promise<void>
  className?: string
}

export function CartItemCard({
  item,
  setCartItems,
  onRemove,
  className = "",
}: CartItemCardProps) {
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);
  const debounce = useRef<NodeJS.Timeout | null>(null);

  const price = parseFloat(item.medicine.price)
  const subtotal = price * quantity

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity);

    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    try {
      debounce.current = setTimeout(async () => {
        const res = await updateCartQuantity(item.id, newQuantity);

        if (!res.data) {
          toast.error("Cart update faild");
          setQuantity(item.quantity);
          return;
        }
        console.log(res.data)
        if (res.data.ok) {
          toast.success("Cart updated");
          setCartItems((prev) =>
            prev && prev.map((cartItem) =>
              item.id === cartItem.id ? { ...cartItem, quantity: newQuantity } : cartItem
            )
          )
        }
        else {
          toast.error(res.data.message);
          setQuantity(item.quantity);
        }
      }, 2000);

    } catch (error) {
      setQuantity(item.quantity);
      toast.error("Failed to update cart")
    }
  }

  const handleRemove = async (cartId: string) => {
    setIsRemoving(true)
    await onRemove(cartId);
    setIsRemoving(false);
  }

  return (
    <Card className={`overflow-hidden ${isRemoving ? "opacity-50" : ""} ${className} relative`}>
      <CardDescription className="absolute top-0 left-0 rounded-br-2xl py-1 px-4 z-1 dark:bg-slate-800 bg-gray-100 text-muted-foreground">Seller {item.medicine.author.storeName}</CardDescription>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
            <Image
              src={item.medicine.imageUrl}
              alt={item.medicine.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-base line-clamp-2">
                  {item.medicine.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  BDT {price.toFixed(2)}
                </p>
              </div>

              {/* Remove Button - Desktop */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(item.id)}
                disabled={isRemoving}
                className="flex h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                {isRemoving ? (
                  <Spinner />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Quantity Controls & Price */}
            <div className="flex items-center justify-between mt-2">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={quantity === 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <div className="flex items-center justify-center w-12 text-center">
                  <span className="font-semibold">{quantity}</span>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => updateQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Subtotal */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  BDT {subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
