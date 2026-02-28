"use client"

import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { KeyboardEvent, useCallback, useEffect, useState } from "react"
import { getCategories } from "@/actions/shop.actions"
import { PaginationIconsOnly } from "./Pagination"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"

interface MedicineSearchBarProps {
    onSearch?: (params: SearchParams) => void
    className?: string;
    metaData?: {
        limit: number;
        page: number;
        total: number;
        totalPage: number;
    }
}

export interface SearchParams {
    searchText: string;
    categoryId: string;
    sortBy: string;
    page: number | string;

}

const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
]

type Categories = {
    id: string;
    name: string;
}

export function Searchbar({ onSearch, metaData, className }: MedicineSearchBarProps) {
    const [categories, setCategories] = useState<Categories[]>([{ id: "all", name: "All Categories" }]);

    const [page, setPage] = useState<number | string>(1);
    const [searchText, setSearchText] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedSort, setSelectedSort] = useState<string>("relevance")

    const handleSearch = useCallback(() => {
        onSearch?.({
            searchText: searchText,
            categoryId: selectedCategory,
            sortBy: selectedSort,
            page: page
        })
    }, [searchText, selectedCategory, selectedSort, page, onSearch])

    // Trigger search when Enter is pressed
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    // Auto-search when filters change
    useEffect(() => {
        handleSearch();
    }, [selectedCategory, selectedSort, page]);

    const clearSearch = () => {
        setSearchText("")
        setSelectedCategory("all")
        setSelectedSort("relevance")
    }
    const getCategoryList = async () => {
        const { data, error } = await getCategories();
        if (data) {
            if (!data.ok) {
                toast.error(data.message)
            }
            else {
                setCategories([...categories, ...data.data]);
            }
        }
        else {
            toast.error(error);
        }
    }

    useEffect(() => {
        getCategoryList();
        handleSearch();
    }, [])

    return (
        <div className={`w-full space-y-4 ${className} mt-4`}>
            {/* Main Search Bar */}
            <div className="flex items-center flex-col gap-2 w-full">
                {/* Search Input */}
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for medicines, health products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-10 h-11"
                    />
                    {searchText && (
                        <button
                            onClick={() => setSearchText("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <div className="flex gap-4 w-full">
                    {/* Category Select - Desktop */}
                    <div className="min-w-36">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-full select-trigger">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort Select - Desktop */}
                    <div className="min-w-36">
                        <Select value={selectedSort} onValueChange={setSelectedSort}>
                            <SelectTrigger className="sort-trigger">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== "all" || selectedSort !== "relevance" || searchText) && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-muted-foreground">Active filters:</span>

                    {searchText && (
                        <Badge variant="secondary" className="gap-1">
                            Query: {searchText}
                            <button
                                onClick={() => setSearchText("")}
                                className="ml-1 hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    {selectedCategory !== "all" && (
                        <Badge variant="secondary" className="gap-1">
                            {categories.find(c => c.id === selectedCategory)?.name}
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className="ml-1 hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    {selectedSort !== "relevance" && (
                        <Badge variant="secondary" className="gap-1">
                            {sortOptions.find(s => s.value === selectedSort)?.label}
                            <button
                                onClick={() => setSelectedSort("relevance")}
                                className="ml-1 hover:text-destructive"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="h-6 text-xs"
                    >
                        Clear all
                    </Button>
                </div>
            )}
            {
                metaData &&
                <PaginationIconsOnly pageState={[page, setPage]} metaData={metaData} />
            }
            <Toaster position="top-center" />
        </div>
    )
}
