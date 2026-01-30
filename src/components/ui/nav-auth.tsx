"use client"
import { redirect } from "next/navigation";
import { Button } from "./button";

export default function NavAuth() {
    return (
        <div className="flex gap-2">
            <Button onClick={() => redirect("/login")} variant={"outline"} className="bg-white text-black dark:text-white cursor-pointer">
                Login
            </Button>
            <Button onClick={() => redirect("/signup")} className="cursor-pointer">Sign up</Button>
        </div>
    );
}