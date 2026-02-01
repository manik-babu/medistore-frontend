"use client"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
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
import { useState } from "react"

type MetaData = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}
export function PaginationIconsOnly({ pageState, metaData }: { pageState: any; metaData: MetaData }) {
    const [page, setPage] = pageState;
    return (
        <div className="flex items-center justify-between gap-4">
            <Field orientation="horizontal" className="w-fit">
                <FieldLabel htmlFor="select-rows-per-page">Page {metaData.page} of {metaData.totalPage}</FieldLabel>
            </Field>
            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    <Button disabled={page.toString() === "1"} onClick={() => setPage(Number(page) - 1)} className="bg-transparent dark:text-white text-black hover:bg-transparent cursor-pointer flex items-center font-bold"><ChevronLeft /> Previous </Button>
                    <Select value={page.toString()} onValueChange={setPage}>
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
                    <Button disabled={Number(page) === metaData.totalPage} onClick={() => setPage(Number(page) + 1)} className="bg-transparent dark:text-white text-black hover:bg-transparent cursor-pointer flex items-center font-bold" >Next <ChevronRight /></Button>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
