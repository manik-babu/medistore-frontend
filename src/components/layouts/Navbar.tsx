import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
    return (
        <div className="w-screen dark:bg-card bg-card h-16 flex items-center">
            <div>
                {/* <Image src="" alt="" /> */}
                <h1 className="font-bold text-3xl">MediStore</h1>
            </div>
            <nav className="grow bg-amber-200">
                <Link href="/">Home</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/shop">Orders</Link>
            </nav>
            <div className="flex gap-2">
                <Button variant={"outline"} className="bg-white text-black dark:text-white cursor-pointer">Login</Button>
                <Button className="cursor-pointer">Sign up</Button>

            </div>
        </div>
    );
}