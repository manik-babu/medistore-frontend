import { UserRole } from "@/constants/userRole";
import Image from "next/image";
import Link from "next/link";
import RoleAction from "./role-action";

export default function NavProfile({ session }: any) {

    return (
        <div className="border-2 flex justify-center items-center rounded-full px-1 py-1 gap-4">
            <RoleAction role={session.user.role} className="bg-amber-200 p-2 rounded-full" />
            <div className="relative outline-2 flex w-10 h-10 justify-center rounded-full items-center overflow-hidden">
                <Image src="/a.jpg" alt="profile" className="object-contain" fill />
            </div>
        </div>
    );
}