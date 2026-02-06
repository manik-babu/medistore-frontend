import Link from "next/link";
import { ModeToggle } from "../ui/modeToggle";
import NavAuthProfile from "../ui/NavAuthProfile";

export default async function Navbar() {
    return (
        <div className="fixed top-0 w-[100vw] shadow-sm border dark:bg-card bg-card h-16 flex items-center justify-between px-[5vw] z-10">
            <div>
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