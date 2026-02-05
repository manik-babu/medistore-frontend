"use client"

import { addMedicine, updateMedicine } from "@/actions/seller.actions";
import { getCategories, getMedicineById } from "@/actions/shop.actions";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { UploadImage } from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import z from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    categoryId: z.string().min(1, "Category is required"),
    price: z.number().positive("Price must be a positive number")
})
export default function AddMedicine() {
    const router = useRouter();
    const [fetchError, setfetchError] = useState<string | null>(null);
    const medicineId = useSearchParams().get("medicineId");
    const [loading, setloading] = useState<boolean>(false)
    const [categories, setCategories] = useState<{ id: string; name: string; }[] | null>(null);
    const [formError, setformError] = useState<null | string>(null);
    const [imageError, setimageError] = useState<string | null>(null);
    const [image, setimage] = useState<File | null>(null);
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            categoryId: "",
            price: 0
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                if (!medicineId) {
                    if (!image) {
                        setimageError("Image is required");
                        return;
                    }
                    setloading(true);
                    const { data, error } = await addMedicine({ ...value, image: image as File });
                    setloading(false);
                    if (data && !error) {
                        if (data.ok) {
                            toast.success(data.message);
                        }
                        else {
                            toast.error(data.message);
                        }
                    }
                    else {
                        setformError("Something went wrong! Please try again");
                    }
                }
                else {
                    console.log(value);
                    console.log("Update start")
                    setloading(true);
                    const { data, error } = await updateMedicine(value, medicineId);
                    console.log("Update finish")
                    setloading(false);
                    if (data) {
                        console.table(data)
                        if (data.ok) {
                            toast.success(data.message);
                        }
                        else {
                            toast.error(data.message);
                        }
                    }
                    else {
                        setformError("Something went wrong! Please try again");
                    }
                }
                setTimeout(() => {
                    router.push("/seller/medicines")
                }, 1000);

            } catch (error) {
                setloading(false);
                setformError("Something went wrong! Please try again");
            }
        }
    });
    const handleImage = (e: any) => {
        setimage(e.target.files[0]);
    }
    const handleRemove = () => {
        setimage(null);
    }

    const getCategoryList = async () => {
        const { data, error } = await getCategories();
        if (data) {
            setCategories(data.data);
        }
        else {
            console.log(error)
        }
    }
    const fetchMedicineData = async () => {
        if (medicineId) {
            const { data, error } = await getMedicineById(medicineId);
            if (error) {
                setfetchError("Something went wrong please try again");
                return;
            }

            if (!data.ok) {
                setfetchError(data.message);
            }
            else {
                const medicineDetails = data.data.medicine;
                console.log(medicineDetails)
                form.setFieldValue("name", medicineDetails.name);
                form.setFieldValue("description", medicineDetails.description);
                form.setFieldValue("price", Number(medicineDetails.price));
                form.setFieldValue("categoryId", medicineDetails.categoryId)
            }
        }
    }
    if (fetchError) {
        throw new Error(fetchError);
    }

    useEffect(() => {
        getCategoryList();
        fetchMedicineData();
    }, [])
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
                        {
                            medicineId ?
                                <CardDescription className="text-red-500">You can't update medicine image</CardDescription>
                                :
                                <>
                                    <FieldLabel htmlFor={"image"}>Upload image</FieldLabel>
                                    <UploadImage handleRemove={handleRemove} handleImage={handleImage} image={image} />
                                    {imageError && <CardDescription className="text-red-500">
                                        {imageError}
                                    </CardDescription>}
                                </>
                        }

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
                                        onChange={e => { field.handleChange(Number(e.target.value)); setformError(null); }}
                                        value={field.state.value != 0 ? field.state.value : ""}
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
                        medicineId ?
                            loading ?
                                <Button type="submit" disabled>Updating <Spinner data-icon={"inline-start"} /></Button>
                                :
                                <Button className="cursor-pointer">Update</Button>
                            :
                            loading ?
                                <Button type="submit" disabled>Publishing <Spinner data-icon={"inline-start"} /></Button>
                                :
                                <Button className="cursor-pointer">Publish</Button>
                    }
                </FieldGroup>
            </form>
            <ToastContainer position="top-center" />
        </div>
    );
}