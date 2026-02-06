import { UserRole } from "@/constants/userRole";
import Image from "next/image";
import Link from "next/link";
import RoleAction from "./role-action";
import RoleActionImage from "./roleActionImage";

export default function NavProfile({ session }: any) {

    return (
        <div className="border-2 flex justify-center items-center rounded-full px-1 py-1 gap-4">
            <RoleAction role={session.role} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-full flex justify-center items-center gap-2" />
            <div className="relative outline-2 flex w-10 h-10 justify-center rounded-full items-center overflow-hidden">
                <RoleActionImage user={session} />
            </div>
        </div>
    );
}