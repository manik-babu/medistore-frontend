import Link from "next/link";
import { ModeToggle } from "../ui/modeToggle";
import NavAuthProfile from "../ui/NavAuthProfile";
import { Button } from "../ui/button";

export default async function Navbar() {
    return (
        <div className="fixed top-0 w-[100vw] border-b dark:bg-card bg-card h-16 flex items-center justify-between px-4 md:px-[5vw] z-10">
            <div>
                <h1 className="font-bold text-3xl">MediStore</h1>
            </div>
            <nav className=" flex justify-center items-center gap-2">
                <Link href="/">
                    <Button variant={"ghost"} className="cursor-pointer">
                        Home
                    </Button>
                </Link>
                <Link href="/shop">
                    <Button variant={"ghost"} className="cursor-pointer">
                        shop
                    </Button>
                </Link>
                <NavAuthProfile />
            </nav>
        </div>
    );
}