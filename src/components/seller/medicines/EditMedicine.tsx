"use client"

import { addMedicine, updateMedicine } from "@/actions/seller.actions";
import { getCategories, getMedicineById } from "@/actions/shop.actions";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { MedicineData } from "@/types/medicine";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import z from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.string().min(1, "Category is required"),
    price: z.string().min(1, "Price is required")
});
export default function EditMedicine({ medicine }: { medicine: MedicineData }) {
    const router = useRouter();
    const [loading, setloading] = useState<boolean>(false)
    const [categories, setCategories] = useState<{ id: string; name: string; }[] | null>(null);
    const [formError, setformError] = useState<null | string>(null);
    const form = useForm({
        defaultValues: {
            name: medicine.name,
            description: medicine.description,
            categoryId: medicine.category.id,
            price: medicine.price
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                const price = Number(value.price);
                if (price < 0) {
                    form.setFieldMeta("price", (prev) => ({
                        ...prev,
                        error: "Price mus be positive number",
                        isTouched: true
                    }));
                    return;
                }
                setloading(true);
                const { data, error } = await updateMedicine({
                    name: value.name,
                    description: value.description,
                    categoryId: value.categoryId,
                    price: price
                }, medicine.id);
                setloading(false);
                if (data) {
                    if (data.ok) {
                        toast.success(data.message);
                        router.back();
                    }
                    else {
                        toast.error(data.message);
                    }
                }
                else {
                    setformError("Something went wrong! Please try again");
                }


            } catch (error) {
                setloading(false);
                setformError("Something went wrong! Please try again");
            }
        }
    });

    const getCategoryList = async () => {
        const { data, error } = await getCategories();
        if (data && data.ok) {
            setCategories(data.data);
        }
        else {
            setformError("Unable to download categories")
        }
    }

    useEffect(() => {
        getCategoryList();
    }, []);
    return (
        <div className="p-4">
            <CardHeader className="px-0 pb-4">
                <CardTitle>List a product for sale</CardTitle>
                <CardDescription>
                    Enter your product details below to add in the market
                </CardDescription>
                {formError && <CardDescription className="text-red-500">
                    {formError}
                </CardDescription>}
            </CardHeader>
            <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
                <FieldGroup>
                    <Field >
                        <div className='flex gap-1 w-full overflow-x-auto auto my-4'>
                            <div className='relative w-49'>
                                <img className='w-full rounded-md border' src={medicine.imageUrl} alt={'image'} />
                            </div>
                        </div>
                        <CardDescription className="text-red-500">You can't update medicine image</CardDescription>
                    </Field>
                    <form.Field
                        name="name"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input
                                        id={field.name}
                                        type="text"
                                        placeholder="Napa"
                                        onChange={e => { field.handleChange(e.target.value); setformError(null); }}
                                        value={field.state.value}
                                        aria-invalid={isInvalid}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />
                    <form.Field
                        name="description"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                                    <Textarea
                                        id={field.name}
                                        placeholder="Type your medicine description here"
                                        onChange={e => { field.handleChange(e.target.value); setformError(null); }}
                                        value={field.state.value}
                                        aria-invalid={isInvalid}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />
                    <form.Field
                        name="categoryId"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Select value={field.state.value && field.state.value} onValueChange={field.handleChange}>
                                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                                    <SelectTrigger className="select-trigger min-w-2xs" aria-invalid={isInvalid}>
                                        <SelectValue placeholder="Tap to select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            categories &&
                                            categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Select>
                            )

                        }}

                    />
                    <form.Field
                        name="price"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                                    <Input
                                        className="w-36!"
                                        type="text"
                                        id={field.name}
                                        placeholder="Taka"
                                        onChange={e => { field.handleChange(e.target.value); setformError(null); }}
                                        value={field.state.value}
                                        aria-invalid={isInvalid}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />

                </FieldGroup>
                <FieldGroup className="flex flex-row justify-between items-center mt-4">
                    <Button onClick={() => router.push("/seller/medicines")} variant={"outline"} className="cursor-pointer">Cancel</Button>
                    {
                        loading ?
                            <Button type="submit" disabled>Updating <Spinner data-icon={"inline-start"} /></Button>
                            :
                            <Button className="cursor-pointer">Update</Button>

                    }
                </FieldGroup>
            </form>
            <ToastContainer position="top-center" />
        </div>
    );
}