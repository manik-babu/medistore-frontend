"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Minus, Plus, ShoppingCart, Star, Package, Store, Calendar, Heart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { getMedicineById } from "@/actions/shop.actions"
import { Toaster } from "../ui/sonner"
import { Spinner } from "../ui/spinner"
import { PageLoader } from "../ui/Loader"
import { RatingsOverview } from "../reviews/RatingsOverview"
import { MedicineData } from "@/types/medicine"
import { ReviewsList } from "../reviews/ReviewList"
import { addToCart, getSession } from "@/actions/user.action"
import { UserRole } from "@/constants/userRole"
import { increment } from "@/redux/slice/cartSlice"
import { useAppDispatch } from "@/redux/hooks"
import { useRouter } from "next/navigation"



interface MedicineDetailsPageProps {
  data: MedicineData;
  className?: string;
}

export function MedicineDetailsPage({
  data,
  className = "",
}: MedicineDetailsPageProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1)

  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1)
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }
  const handleAddToCart = async () => {
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
      const res = await addToCart(data.id, quantity);
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
    <div className={`container mx-auto px-4 max-w-7xl ${className}`}>
      <div className="py-6">
        <Button onClick={() => router.back()} variant="outline" className="rounded-full cursor-pointer"> <ArrowLeft /> Back to product page</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={data.medicine.imageUrl}
                  alt={data.medicine.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {data.medicine.isFeatured && (
                  <Badge className="absolute top-4 left-4 bg-blue-500">
                    Featured
                  </Badge>
                )}
                {data.medicine.isBanned && (
                  <Badge variant="destructive" className="absolute top-4 right-4">
                    Unavailable
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sold by</span>
                <span className="font-medium">{data.medicine.author.storeName}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Sold</span>
                <span className="font-medium">{data.medicine._count.carts} sold</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Details */}
        <Card className=" p-6">
          {/* Product Title & Category */}
          <div>
            <Badge variant="outline" className="mb-2">
              {data.medicine.category.name}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{data.medicine.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {data.ratings.total._avg.rating ? data.ratings.total._avg.rating.toFixed(1) : "No ratings"} (
                {data.ratings.total._count} {data.ratings.total._count === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>

          {/* Price */}
          <div>
            <CardContent className="p-0">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">
                  {formatPrice(data.medicine.price)}
                </span>
              </div>
            </CardContent>
          </div>



          {/* Quantity Selector & Add to Cart */}
          <div>
            <CardContent className="p-0 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1 || data.medicine.isBanned}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 text-center">
                    <span className="text-2xl font-semibold">{quantity}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange("increase")}
                    disabled={data.medicine.isBanned}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                {
                  isAddingToCart ?
                    <Button
                      className="flex-1 cursor-pointer"
                      size="lg"
                      disabled
                    >
                      Adding <Spinner />
                    </Button>
                    :
                    <Button
                      className="flex-1 cursor-pointer"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                }
              </div>

              {data.medicine.isBanned && (
                <p className="text-sm text-destructive text-center">
                  This product is currently unavailable
                </p>
              )}
            </CardContent>
          </div>

          {/* Description */}
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground leading-relaxed">
                {data.medicine.description}
              </p>
            </CardContent>
          </div>

          {/* Product Stats */}
          <div>
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category</span>
                <span className="font-medium">{data.medicine.category.name}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Sold</span>
                <span className="font-medium">{data.medicine._count.carts} sold</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Added on</span>
                <span className="font-medium">{formatDate(data.medicine.createdAt)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <span className="font-medium">{formatDate(data.medicine.updatedAt)}</span>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
      <RatingsOverview data={data.ratings} />
      <ReviewsList medicineId={data.medicine.id} />
    </div>
  )
}
