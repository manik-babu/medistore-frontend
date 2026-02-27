"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { getCategories } from "@/actions/shop.actions";
import { PageLoader } from "../ui/Loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { addCategory } from "@/actions/admin.actions";
import { Toaster } from "../ui/sonner";
import { Spinner } from "../ui/spinner";
type Categories = { id: string; name: string; }[]
export default function AdminCategory() {
    const [categoryName, setCategoryName] = useState<string>("");
    const [categories, setCategories] = useState<Categories>([]);
    const [fetching, setFetching] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [FieldError, setFieldError] = useState(false)

    const handleAdd = async () => {
        if (!categoryName) {
            setFieldError(true);
            return;
        }
        setIsAdding(true);
        try {
            const { data, error } = await addCategory(categoryName);
            if (!data) {
                toast.error(error);
                return;
            }
            if (!data.ok) {
                toast.error(data.message);
            }
            else {
                toast.success(data.message);
                setCategoryName("");
                setCategories((prev) => [data.data, ...prev]);
            }
        } catch (error: any) {
            toast.error(error.message)
        }
        finally {
            setIsAdding(false);
        }
    }

    const getCategoryList = async () => {
        try {
            const { data, error } = await getCategories();
            if (!data) {
                toast.error(error);
                return;
            }
            if (!data.ok) {
                toast.error(data.message);
            }
            else {
                setCategories(data.data);
            }
        } catch (error: any) {
            toast.error(error.message || "Unable to fetch categories")
        }
        finally {
            setFetching(false);
        }
    }
    useEffect(() => {
        getCategoryList();
    }, [])
    return (
        <div className="m-4">
            <Card className="gap-0">
                <CardHeader className="pb-4">
                    <CardTitle>List a new category</CardTitle>
                    <CardDescription>
                        Enter category name below to add in the market
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        aria-invalid={FieldError}
                        id="category"
                        name="category"
                        placeholder="e.g Pain fever inflammation"
                        onChange={e => { setCategoryName(e.target.value); setFieldError(false) }}
                        value={categoryName}
                    />
                    <div className="flex justify-between items-center my-4">
                        <Button variant={"outline"} onClick={() => setCategoryName("")}>Clear</Button>
                        <Button onClick={handleAdd} disabled={isAdding}>
                            {
                                isAdding
                                    ?
                                    <>Adding <Spinner /></>
                                    :
                                    "Add"
                            }
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="mt-6">
                <CardContent>
                    {
                        fetching ?
                            <PageLoader message="Loading categories" />
                            :
                            categories.length == 0 ?
                                <div>
                                    No categories
                                </div>
                                :
                                <div>
                                    <h1 className="font-bold text-2xl mb-4">Categories</h1>
                                    <Table>
                                        <TableBody>
                                            {
                                                categories.map((category) => (
                                                    <TableRow key={category.id}>
                                                        <TableCell>
                                                            {category.name}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </div>


                    }
                </CardContent>
            </Card>
            <Toaster position="top-center" />
        </div>

    );
}