"use client"

import Link from "next/link";
import NavAuthProfile from "../ui/NavAuthProfile";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const path = usePathname();
    const isActive = (url: string) => {
        return path === url;
    }
    return (
        <div className="fixed top-0 w-[100vw] border-b dark:bg-card bg-card h-16 flex items-center justify-between px-4 md:px-[5vw] z-10">
            <div>
                <h1 className="font-bold text-3xl">MediStore</h1>
            </div>
            <nav className=" flex justify-center items-center gap-2">
                <div className="sm:block hidden">
                    <Link href="/">
                        <Button variant={"ghost"} className={`cursor-pointer ${isActive("/") && "bg-secondary"}`}>
                            Home
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant={"ghost"} className={`cursor-pointer ${isActive("/shop") && "bg-secondary"}`}>
                            shop
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant={"ghost"} className={`cursor-pointer ${isActive("/about") && "bg-secondary"}`}>
                            about
                        </Button>
                    </Link>
                </div>
                <NavAuthProfile />
                <div className="flex sm:hidden h-full justify-center items-center">
                    <MobileNav />
                </div>
            </nav>
        </div>
    );
}