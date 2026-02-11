"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Package } from "lucide-react"

export function CartOrdersNavbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="border-b bg-background">
      <div className="md:px-[5vw] px-4">
        <div className="flex h-14 items-center gap-6">
          <Link
            href="/customer/carts"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary relative ${isActive("/customer/carts")
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
              }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Link>

          <Link
            href="/customer/orders"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${isActive("/customer/orders")
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
              }`}
          >
            <Package className="h-4 w-4" />
            My Orders
          </Link>
        </div>
      </div>
    </nav>
  )
}
