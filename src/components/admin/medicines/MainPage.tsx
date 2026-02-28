"use client"

import { Pill, Search, SlidersHorizontal, X } from "lucide-react"
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
import { Dispatch, KeyboardEvent, useActionState, useCallback, useEffect, useState } from "react"
import { getCategories, getMedicines } from "@/actions/shop.actions"
import { toast } from "sonner"
import { ShopMedicine } from "@/types/medicine"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setShopData } from "@/redux/slice/medicineSlice"
import { useRouter, useSearchParams } from "next/navigation"
import { Router } from "next/router"
import { setCategories } from "@/redux/slice/categories"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminMedicines } from "@/actions/admin.actions"
import { setAdminMedicineData } from "@/redux/slice/adminMedicine"
import { PageLoader } from "@/components/ui/Loader"
import { Toaster } from "@/components/ui/sonner"
import { PaginationMedicine } from "./Pagination"
import MedicineList from "./MedicineList"
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"


export interface SearchParams {
    searchText: string
    categoryId: string
    sortBy: string
}

const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
]
export function AdminMedicinePage() {
    const medicines = useAppSelector((state) => state.adminMedicine)
    const categories = useAppSelector((state) => state.category);
    const dispatch = useAppDispatch();


    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [searching, setSearching] = useState(false);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();

    const [searchText, setSearchText] = useState<string>(params.get("search") || "");
    const setSearchParams = (key: string, value: string) => {
        params.set(key, value);
        router.push(`?${params.toString()}`);
        console.log(params.get("page"))
        handleSearch();
    }

    const handleSearch = async () => {
        setSearching(true);
        try {
            const searchData = {
                searchText: params.get("search") || "",
                category: params.get("category") || "All Categories",
                sortBy: params.get("sort") || "relevance",
                page: params.get("page") || "1",
                banned: params.get("banned") || "false",
                featured: params.get("featured") || "false",
            };
            console.log({ searchData })
            const { data, error } = await getAdminMedicines(searchData);
            if (!data) {
                toast.error(error);
                return;
            }
            if (!data.ok) {
                toast.error(data.message);
            }
            else {
                dispatch(setAdminMedicineData(data.data))
            }
        } catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setSearching(false);
        }

    }
    // Trigger search when Enter is pressed
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchParams("search", searchText)
        }
    }

    // Auto-search when filters change
    useEffect(() => {
        if (medicines.data.length === 0) {
            handleSearch();
        }
        if (categories.length <= 1) {
            getCategoryList();
        }
    }, []);
    const getCategoryList = async () => {
        const { data, error } = await getCategories();
        if (data) {
            dispatch(setCategories(data.data));
        }
        else {
            toast.error(error);
        }
    }
    return (
        <div className="m-4">
            <Card className={`w-full space-y-4 mt-4 sm:px-4 px-2 py-4 gap-1`}>
                <CardTitle>
                    Search For Medicines
                </CardTitle>
                {/* Main Search Bar */}
                <div className="flex items-center lg:flex-row flex-col gap-2 w-full">
                    {/* Search Input */}
                    <div className="relative flex-1 w-full flex gap-1">
                        <Input
                            type="text"
                            placeholder="Search for medicines, health products..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pr-10 h-11"
                        />
                        {searchText && (
                            <button
                                onClick={() => { setSearchParams("search", ""); setSearchText("") }}
                                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        <Button onClick={() => setSearchParams("search", searchText)} className="h-11 w-20">Search</Button>
                    </div>

                    {/* Category Select - Desktop */}
                    <div className="flex gap-2 lg:w-fit w-full">
                        <div className="hidden sm:block min-w-36">
                            <Select value={params.get('category') || "All Categories"} onValueChange={(value) => setSearchParams('category', value)}>
                                <SelectTrigger className="w-full select-trigger">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={category.name}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sort Select - Desktop */}
                        <div className="hidden sm:block min-w-36">
                            <Select value={params.get('sort') || "relevance"} onValueChange={(value) => setSearchParams("sort", value)}>
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

                    {/* Mobile Filter Button */}
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="sm:hidden h-11 w-full relative">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[400px]">
                            <SheetHeader>
                                <SheetTitle>Filter & Sort</SheetTitle>
                                <SheetDescription>
                                    Refine your medicine search
                                </SheetDescription>
                            </SheetHeader>
                            <div className="space-y-6 mt-6 px-4">
                                {/* Mobile Category */}
                                <div className="space-y-2">
                                    <Label htmlFor="mobile-category">Category</Label>
                                    <Select value={params.get("category") || "All Categories"} onValueChange={(value) => setSearchParams('category', value)}>
                                        <SelectTrigger id="mobile-category">
                                            <SelectValue placeholder="Select category" />
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

                                {/* Mobile Sort */}
                                <div className="space-y-2">
                                    <Label htmlFor="mobile-sort">Sort By</Label>
                                    <Select value={params.get("sort") || "relevance"} onValueChange={(value) => setSearchParams('sort', value)}>
                                        <SelectTrigger id="mobile-sort">
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

                                {/* Actions */}
                                <div className="flex gap-2 pt-4">
                                    <Button
                                        onClick={() => {
                                            handleSearch()
                                            setIsFilterOpen(false)
                                        }}
                                        className="flex-1"
                                    >
                                        Apply Filters
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="flex items-center gap-2">
                    <FieldLabel className="w-36! h-11! flex justify-center">
                        <Field orientation="horizontal" className="py-0! px-4 flex! justify-center items-center cursor-pointer">
                            <Checkbox checked={params.get("banned") ? params.get("banned") === "true" : false} onCheckedChange={(value) => setSearchParams("banned", value ? "true" : "false")} id="toggle-checkbox" name="oldest-first" />
                            <FieldContent>
                                <FieldTitle>Banned</FieldTitle>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                    <FieldLabel className="w-36! h-11! flex justify-center">
                        <Field orientation="horizontal" className="py-0! px-4 flex! justify-center items-center cursor-pointer">
                            <Checkbox checked={params.get("featured") ? params.get("featured") === "true" : false} onCheckedChange={(value) => setSearchParams("featured", value ? "true" : "false")} id="toggle-checkbox" name="oldest-first" />
                            <FieldContent>
                                <FieldTitle>Featured</FieldTitle>
                            </FieldContent>
                        </Field>
                    </FieldLabel>
                </div>
            </Card>
            <Card className="mt-6">
                <CardContent>
                    <h1 className="font-bold text-2xl">Total Medicines ({medicines.data.length})</h1>
                    {
                        searching ? <PageLoader message="Searching users" />
                            :
                            medicines.data.length === 0 ?
                                <div className="text-muted-foreground mt-11 flex justify-center flex-col items-center">
                                    <Pill className="w-16 h-16" />
                                    <h1 >No search result</h1>
                                </div>
                                :
                                <div>
                                    <PaginationMedicine setSearchParams={setSearchParams} metaData={medicines.meta} className="my-4" />
                                    <MedicineList medicines={medicines.data} />
                                </div>
                    }

                </CardContent>

            </Card>
            <Toaster position="top-center" />
        </div>
    )
}

