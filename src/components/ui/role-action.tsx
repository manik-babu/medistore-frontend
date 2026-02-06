"use client"

import { UserRole } from "@/constants/userRole";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Badge } from "./badge";
import { ShoppingCart } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { getUserDetails } from "@/actions/user.action";
import { toast } from "sonner";
import { setCartValue } from "@/redux/slice/cartSlice";

export default function RoleAction({ role, className }: { role: string; className: string }) {
    const cartCount = useAppSelector((state) => state.cart.value);
    const dispatch = useAppDispatch();

    const getDetails = async () => {
        const { data, error } = await getUserDetails();
        if (!data) {
            toast.error("Cart data not found!");
        }
        else {
            dispatch(setCartValue(data._count.carts))
        }
    }
    useEffect(() => {
        getDetails();
    }, []);
    if (role === UserRole.ADMIN) {
        return (
            <Link href="/admin/dashboard" className={className}>
                <LayoutDashboard /> Dashboard
            </Link>
        )

    }
    else if (role === UserRole.CUSTOMER) {
        return (
            <Link href="/customer/cart" className={`${className} relative`}>
                <Badge className="absolute -top-1 -right-1 w-fit h-4">{cartCount}</Badge>
                <ShoppingCart />
            </Link>
        )
    }
    else {
        return (
            <Link href="/seller/dashboard" className={className}>
                <LayoutDashboard /> Dashboard
            </Link>
        )
    }
}