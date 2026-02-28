"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Pagination,
    PaginationContent,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

type MetaData = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}
export function PaginationUser({ setSearchParams, metaData, className }: { setSearchParams: (key: string, value: string) => void, metaData: MetaData; className?: string }) {
    return (
        <div className={`flex items-center justify-between gap-4 ${className}`}>
            <Field orientation="horizontal" className="w-fit">
                <FieldLabel htmlFor="select-rows-per-page">Page {metaData.page} of {metaData.totalPage}</FieldLabel>
            </Field>
            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <Button disabled={metaData.page.toString() === "1"} onClick={() => setSearchParams("page", (metaData.page - 1).toString())} className="bg-transparent dark:text-white text-black hover:bg-transparent cursor-pointer flex items-center font-bold"><ChevronLeft /> Previous </Button>
                    <Select value={metaData.page.toString()} onValueChange={(value) => setSearchParams("page", value)}>
                        <SelectTrigger className="w-14" id="select-rows-per-page">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectGroup>
                                {Array.from({ length: metaData.totalPage }, (_, i) => i + 1).map((i) => (
                                    <SelectItem key={i} value={i.toString()}>{i}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button disabled={metaData.page === metaData.totalPage} onClick={() => setSearchParams("page", (metaData.page + 1).toString())} className="bg-transparent dark:text-white text-black hover:bg-transparent cursor-pointer flex items-center font-bold" >Next <ChevronRight /></Button>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
