"use client"

import { ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { SheetContent, SheetTrigger, Sheet, SheetTitle, SheetClose } from "../ui/sheet"
import { MedicineDetailsPage } from "./MedicineDetailsPage"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { Toaster } from "../ui/sonner"
import { addToCart, getSession } from "@/actions/user.action"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { UserRole } from "@/constants/userRole"
import { increment } from "@/redux/slice/cartSlice"
import { useState } from "react"
import { Spinner } from "../ui/spinner"

interface Product {
  id: string
  imageUrl: string
  imageCloudinaryId: string
  price: number
  isBanned: boolean
  isFeatured: boolean
  authorId: string
  name: string
  descriptions: string
  categoryId: string
  createdAt: string
  updatedAt: string
  author: {
    id: string
    storeName: string
    image: string | null
  }
  category: {
    id: string
    name: string
  }
}

interface MedicineProductCardProps {
  product: Product
  className?: string
}

export function MedicineProductCard({
  product,
  className = "",
}: MedicineProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);



  const handleAddToCart = async (medicineId: string, quantity: number) => {
    try {
      setIsAddingToCart(true)
      const { data, error } = await getSession();
      if (!data) {
        toast.error("Login required");
        return;
      }
      if (data && data.role !== UserRole.CUSTOMER) {
        toast.error("Only customer can buy")
        return;
      }
      const res = await addToCart(medicineId, quantity);
      if (res.data.ok) {
        toast.success("Added to the cart")
        dispatch(increment());
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Something went wrong")
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-lg p-4 rounded-2xl ${className}`}>
      <CardHeader className="p-0 bg-amber-50 flex justify-center items-center rounded-md overflow-hidden border">
        <div className="relative aspect-square overflow-hidden bg-gray-100 h-full w-full">
          <Image
            src={product.imageUrl.startsWith('http') ? product.imageUrl : `/images/default-medicine-image.jpg`}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-blue-500">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground">
          by {product.author.storeName}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="taka-symbol">&#x09F3;</span> <span>{product.price}</span>
          </div>
        </div>
      </CardContent>

      <div className="gap-2 flex justify-between">
        <Sheet>
          <SheetTrigger className="flex-1" asChild>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
            >
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[95vh] scroll">
            <SheetTitle className="pl-14 p-2">
              <SheetClose asChild>
                <Button variant="outline" className="rounded-full cursor-pointer"> <ArrowLeft /> Back to product page</Button>
              </SheetClose>
            </SheetTitle>
            <div className="overflow-scroll">
              <MedicineDetailsPage medicineId={product.id} handleAddToCart={handleAddToCart} isAddingToCart={isAddingToCart} />
            </div>
          </SheetContent>
        </Sheet>
        {
          isAddingToCart ?
            <Button
              className="flex-1 cursor-pointer"
              disabled
            >
              Adding <Spinner />
            </Button>
            :
            <Button
              className="flex-1 cursor-pointer"
              onClick={() => handleAddToCart(product.id, 1)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
        }
      </div>
      <Toaster position="top-center" />
    </Card>
  )
}
