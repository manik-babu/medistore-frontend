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
import { Dispatch, KeyboardEvent, useCallback, useEffect, useState } from "react"
import { getCategories, getMedicines } from "@/actions/shop.actions"
import { Card, CardContent } from "../ui/card"
import MedicineCardContainer from "./MedicineCardContainer"
import { toast } from "sonner"
import { PageLoader } from "../ui/Loader"
import { Spinner } from "../ui/spinner"


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

type Categories = {
  id: string;
  name: string;
}

export function ShopPage({ medicines: InitialMedicine }: { medicines: any }) {
  const [medicines, setMedicines] = useState(InitialMedicine)
  const [categories, setCategories] = useState<Categories[]>([{ id: "all", name: "All Categories" }]);

  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSort, setSelectedSort] = useState<string>("relevance")
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [searching, setSearching] = useState(false);
  const [loadingPagination, setLoadingPagination] = useState(false)

  const handleSearch = useCallback(async () => {
    setSearching(true);
    try {
      const { data, error } = await getMedicines({
        searchText,
        categoryId: selectedCategory,
        sortBy: selectedSort,
        page: 1
      });
      if (!data) {
        toast.error(error);
        return;
      }
      if (!data.ok) {
        toast.error(data.message);
      }
      else {
        setMedicines(data.data);
      }
    } catch (error: any) {
      toast.error(error.message)
    }
    finally {
      setSearching(false);
    }

  }, [searchText, selectedCategory, selectedSort]);

  const handlePagination = async () => {
    setLoadingPagination(true);
    try {
      const { data, error } = await getMedicines({
        searchText,
        categoryId: selectedCategory,
        sortBy: selectedSort,
        page: medicines.meta.page + 1
      });
      if (!data) {
        toast.error(error);
        return;
      }
      if (!data.ok) {
        toast.error(data.message);
      }
      else {
        setMedicines((prev: any) => ({
          data: [...prev.data, ...data.data.data],
          meta: data.data.meta
        }));
      }
    } catch (error: any) {
      toast.error(error.message)
    }
    finally {
      setLoadingPagination(false);
    }
  }

  // Trigger search when Enter is pressed
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Auto-search when filters change
  useEffect(() => {
    handleSearch();
  }, [selectedCategory, selectedSort]);

  const clearSearch = () => {
    setSearchText("")
    setSelectedCategory("all")
    setSelectedSort("relevance")
  }
  const getCategoryList = async () => {
    const { data, error } = await getCategories();
    if (data) {
      setCategories([...categories, ...data.data]);
    }
    else {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategoryList();
    handleSearch();
  }, [])
  return (
    <>
      <Card className={`w-full space-y-4 mt-4 sm:px-4 px-2 py-4 gap-1`}>
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
                onClick={() => setSearchText("")}
                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <Button onClick={handleSearch} className="h-11 w-20">Search</Button>
          </div>

          {/* Category Select - Desktop */}
          <div className="flex gap-2 lg:w-fit w-full">
            <div className="hidden sm:block min-w-36">
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
            <div className="hidden sm:block min-w-36">
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
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
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
                    variant="outline"
                    onClick={clearSearch}
                    className="flex-1"
                  >
                    Clear All
                  </Button>
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
      </Card>
      {
        searching ?
          <PageLoader message="Searching medicine" />
          :
          <MedicineCardContainer medicines={medicines.data} />
      }
      {
        medicines.data.length == 0 && <h1 className="text-muted-foreground w-full text-center h-72 mt-20">No medicine found</h1>
      }
      {
        medicines.data.length != 0 && (
          medicines.meta.page !== medicines.meta.totalPage ?
            <div className="w-full flex justify-center items-center my-6">
              {
                loadingPagination ?
                  <Button variant={"outline"} disabled>Showing <Spinner /></Button>
                  :
                  <Button onClick={handlePagination} variant={"outline"}>Show more</Button>
              }

            </div>
            :
            <div className="w-full flex justify-center items-center my-6">
              <h1>No more medicines</h1>
            </div>)
      }
    </>
  )
}
