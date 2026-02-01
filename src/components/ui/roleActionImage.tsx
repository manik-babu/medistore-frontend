import { UserRole } from "@/constants/userRole";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function RoleActionImage({ user, className }: { user: any; className?: string }) {
    console.log(user)
    if (user.role === UserRole.ADMIN) {
        return (
            <Link href="/profile">
                <Avatar className="h-10 w-10 border-2 border-background shadow-lg">
                    <AvatarImage src={user?.image ? user.image : `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback className="text-2xl font-bold">
                        {"User"}
                    </AvatarFallback>
                </Avatar>
            </Link>
        )

    }
    else if (user.role === UserRole.CUSTOMER) {
        return (
            <Link href="profile">
                <Avatar className="h-10 w-10 border-2 border-background shadow-lg">
                    <AvatarImage src={user?.image ? user.image : `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback className="text-2xl font-bold">
                        {"User"}
                    </AvatarFallback>
                </Avatar>
            </Link>
        )
    }
    else {
        return (
            <Link href="/profile">
                <Avatar className="h-10 w-10 border-2 border-background shadow-lg">
                    <AvatarImage src={user?.image ? user.image : `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback className="text-2xl font-bold">
                        {"User"}
                    </AvatarFallback>
                </Avatar>
            </Link>
        )
    }
}