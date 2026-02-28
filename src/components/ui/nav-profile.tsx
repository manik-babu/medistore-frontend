"use client"

import { UserRole } from "@/constants/userRole";
import Image from "next/image";
import Link from "next/link";
import RoleAction from "./role-action";
import RoleActionImage from "./roleActionImage";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavProfile({ session }: any) {
    const path = usePathname();
    const isActive = (url: string) => {
        return path === url;
    }
    return (
        <div className="flex justify-center items-center px-1 py-1 gap-2">
            <RoleAction role={session.role} className="h-8 flex justify-center items-center cursor-pointer" />
            <Link href="/profile" className="cursor-pointer">
                <Button variant="ghost" size="icon" className={`${isActive("/profile") && "bg-secondary"}`}>
                    <User className="h-5 w-5" />
                </Button>
            </Link>

        </div>
    );
}