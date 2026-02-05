import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { ModeToggle } from "../ui/modeToggle";
import NavAuth from "../ui/nav-auth";
import { userService } from "@/services/user.service";
import NavProfile from "../ui/nav-profile";
import NavAuthProfile from "../ui/NavAuthProfile";

export default async function Navbar() {
    return (
        <div className="fixed top-0 w-[100vw] shadow-sm border dark:bg-card bg-card h-16 flex items-center justify-between px-[5vw] z-10">
            <div>
                {/* <Image src="" alt="" /> */}
                <h1 className="font-bold text-3xl">MediStore</h1>
            </div>
            <nav className=" flex justify-center items-center gap-6">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <ModeToggle />
                <NavAuthProfile />
            </nav>
        </div>
    );
}