"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";

export default function Navbar() {
    return (
        <div className="fixed w-[100vw] shadow-sm border dark:bg-card bg-card h-16 flex items-center justify-around z-10">
            <div>
                {/* <Image src="" alt="" /> */}
                <h1 className="font-bold text-3xl">MediStore</h1>
            </div>
            <nav className=" flex justify-center gap-4">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/customer/orders">Orders</Link>
            </nav>
            <div className="flex gap-2">
                <Button onClick={() => redirect("/login")} variant={"outline"} className="bg-white text-black dark:text-white cursor-pointer">
                    Login
                </Button>
                <Button onClick={() => redirect("/signup")} className="cursor-pointer">Sign up</Button>
            </div>
        </div>
    );
}