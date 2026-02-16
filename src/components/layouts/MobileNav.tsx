"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react"
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
export default function MobileNav({ className }: { className?: string }) {
    const path = usePathname();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                    <Link href="/">
                        <Button variant={"ghost"} className={`cursor-pointer w-full hover:text-accent-foreground rounded-none ${path === "/"
                            ? "bg-accent dark:bg-accent/50"
                            : "text-muted-foreground"
                            }`}>
                            Home
                        </Button>
                    </Link>
                    <Link href="/shop">
                        <Button variant={"ghost"} className={`cursor-pointer w-full hover:text-accent-foreground rounded-none ${path === "/shop"
                            ? "bg-accent dark:bg-accent/50"
                            : "text-muted-foreground"
                            }`}>
                            shop
                        </Button>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}