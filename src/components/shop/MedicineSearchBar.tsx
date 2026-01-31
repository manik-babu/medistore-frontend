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

interface MedicineSearchBarProps {
  onSearch?: (params: SearchParams) => void
  className?: string
}

export interface SearchParams {
  query: string
  category: string
  sortBy: string
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "pain-relief", label: "Pain Relief" },
  { value: "cold-flu", label: "Cold & Flu" },
  { value: "antibiotics", label: "Antibiotics" },
  { value: "vitamins", label: "Vitamins & Supplements" },
  { value: "diabetes", label: "Diabetes Care" },
  { value: "heart-health", label: "Heart Health" },
  { value: "digestive", label: "Digestive Health" },
  { value: "skin-care", label: "Skin Care" },
  { value: "first-aid", label: "First Aid" },
  { value: "prescription", label: "Prescription Medicine" },
]

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
]

export function MedicineSearchBar({ onSearch, className }: MedicineSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSort, setSelectedSort] = useState<string>("relevance")
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  const handleSearch = useCallback(() => {
    onSearch?.({
      query: searchQuery,
      category: selectedCategory,
      sortBy: selectedSort,
    })
  }, [searchQuery, selectedCategory, selectedSort, onSearch])

  // Trigger search when Enter is pressed
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // Auto-search when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch()
    }, 500) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategory, selectedSort, handleSearch])

  const clearSearch = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedSort("relevance")
  }

  return (
    <div className={`w-full space-y-4 ${className} mt-20 px-[5vw]`}>
      {/* Main Search Bar */}
      <div className="flex items-center flex-row gap-2 w-full h-12">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for medicines, health products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10 h-11"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Select - Desktop */}
        <div className="hidden md:block min-w-36">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full select-trigger">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Select - Desktop */}
        <div className="hidden md:block min-w-36">
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

        {/* Mobile Filter Button */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden h-11 relative">
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
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
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
      {(selectedCategory !== "all" || selectedSort !== "relevance" || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Query: {searchQuery}
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.value === selectedCategory)?.label}
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
    </div>
  )
}
