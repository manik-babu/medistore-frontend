"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();
    const [search, setSearch] = useState<string>("")
    const handleSearch = () => {

    }
    return (
        <div className="max-w-2xl mx-auto relative">
            <Input
                type="text"
                placeholder="Search for medicines, health products..."
                className="h-14 pl-6 pr-32 text-lg"
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="absolute right-2 top-2" onClick={() => router.push(`/shop?search=${search}`)}>Search</Button>
        </div>
    );
}