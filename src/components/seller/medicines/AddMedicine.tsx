"use client"

import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, } from "@/components/ui/field";
import { UploadImage } from "@/components/ui/ImageUploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number")
})
export default function AddMedicine() {
    const [formError, setformError] = useState<null | string>(null);
    const [image, setimage] = useState<File | null>(null);
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: 0
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                const formData = new FormData();
                if (image) {
                    formData.append("image", image);
                }
                formData.append("name", value.name);
                formData.append("description", value.description);
                formData.append("price", value.price.toString());
                console.log({ formData });
            } catch (error) {

            }
        }
    });
    const handleImage = (e: any) => {
        setimage(e.target.files[0]);
    }
    const handleRemove = () => {
        setimage(null);
    }
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
            <form onSubmit={e => { e.preventDefault(); form.handleSubmit(); }}>
                <FieldGroup>
                    <Field >
                        <FieldLabel htmlFor={"image"}>Upload image</FieldLabel>
                        <UploadImage handleRemove={handleRemove} handleImage={handleImage} image={image} />
                    </Field>
                    <form.Field
                        name="name"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
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
                                <Field data-invalid={isInvalid}>
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
                        name="price"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                                    <Input
                                        className="w-36!"
                                        type="text"
                                        id={field.name}
                                        placeholder="Taka"
                                        onChange={e => { field.handleChange(Number(e.target.value)); setformError(null); }}
                                        // value={field.state.value}
                                        defaultValue={""}
                                        aria-invalid={isInvalid}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            )
                        }}
                    />
                </FieldGroup>
                <FieldGroup className="flex flex-row justify-between items-center mt-4">
                    <Button onClick={() => { form.reset(); setimage(null); }} variant={"outline"} className="cursor-pointer">Cancel</Button>
                    <Button type="submit" className="cursor-pointer">Publish</Button>
                </FieldGroup>
            </form>
        </div>
    );
}