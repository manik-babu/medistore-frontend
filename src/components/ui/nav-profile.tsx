import { UserRole } from "@/constants/userRole";
import Image from "next/image";
import Link from "next/link";
import RoleAction from "./role-action";
import RoleActionImage from "./roleActionImage";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { User } from "lucide-react";

export default function NavProfile({ session }: any) {

    return (
        <div className="flex justify-center items-center px-1 py-1 gap-2">
            <RoleAction role={session.role} className="h-8 flex justify-center items-center cursor-pointer" />
            <Link href="/profile" className="cursor-pointer">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                    <User className="h-5 w-5" />
                </Button>
            </Link>

        </div>
    );
}