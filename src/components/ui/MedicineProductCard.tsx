"use client"

import * as React from "react"
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

interface Product {
  id: string
  image: string
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
  onViewDetails?: (productId: string) => void
  onAddToCart?: (productId: string) => void
  className?: string
}

export function MedicineProductCard({
  product,
  onViewDetails,
  onAddToCart,
  className = "",
}: MedicineProductCardProps) {
  const handleViewDetails = () => {
    onViewDetails?.(product.id)
  }

  const handleAddToCart = () => {
    onAddToCart?.(product.id)
  }

  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-lg p-4 rounded-2xl ${className}`}>
      <CardHeader className="p-0 bg-amber-50 flex justify-center items-center rounded-md overflow-hidden border">
        <div className="relative aspect-square overflow-hidden bg-gray-100 h-full w-full">
          <Image
            src={product.image.startsWith('http') ? product.image : `/images/default-medicine-image.jpg`}
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
        <Button
          variant="outline"
          className="flex-1 cursor-pointer"
          onClick={handleViewDetails}
        >
          <Eye className="h-4 w-4 mr-2" />
          Details
        </Button>
        <Button
          className="flex-1 cursor-pointer"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  )
}
