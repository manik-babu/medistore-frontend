"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserRole } from "@/constants/userRole";
import { updateProfile } from "@/actions/user.action";
import { Toaster } from "../ui/sonner";
import Link from "next/link";
import { UploadImage } from "../ui/ImageUploader";
import { EditProfileImage } from "../ui/EditProfileImage";
type UserProfile = {
    id: string
    name: string
    email: string
    role: string
    age: number | null;
    contact: string | null;
    bio: string | null
    isBanned: boolean
    createdAt: string
    storeName: string | null
    image: string | null
    _count: {
        carts: number;
    }
}

const formSchema = z.object({
    role: z.string(),
    name: z.string().min(1, "Name is required"),
    age: z.string().nullable(),
    contact: z.string().nullable(),
    bio: z.string().nullable(),
    storeName: z.string().nullable()

}).refine((data) => {
    if (data.role === UserRole.SELLER) {
        return data.storeName && data.storeName.length > 0;
    }
    return true;
}, {
    message: "Store name is required",
    path: ["storeName"],
}).refine((data) => {
    if (data.age) {
        const Age = Number(data.age);
        console.log(Age)
        return !(Number.isNaN(Age) || Age <= 0);
    }
    return true;
}, {
    message: "Age must be a positive number",
    path: ["age"],
})
export default function EditProfile({ user }: { user: UserProfile }) {
    const [loading, setloading] = useState(false)
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            role: user.role,
            name: user.name,
            bio: user.bio,
            contact: user.contact,
            age: user.age?.toString() || null,
            storeName: user.storeName
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            setloading(true);
            try {
                const Age = value.age ? Number(value.age) : null
                const res = await updateProfile({
                    name: value.name,
                    bio: value.bio,
                    contact: value.contact,
                    age: Age,
                    storeName: value.storeName
                });
                if (!res.data) {
                    toast.error(res.error || "Profile update failed!");
                    return;
                }
                if (!res.data.ok) {
                    toast.error(res.data.message || "Profile update failed!");
                }
                else {
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error("Profile updating failed")
            }
            finally {
                setloading(false);
            }
        }
    })
    return (
        <Card className="mb-4">
            <CardContent>
                <CardHeader className="px-0 pb-4">
                    <CardTitle>Edit your profile</CardTitle>
                    <CardDescription>
                        Change your information according to your choice
                    </CardDescription>
                    {/* {formError && <CardDescription className="text-red-500">
                    {formError}
                </CardDescription>} */}
                </CardHeader>
                <EditProfileImage image={user.image} name={user.name} />
                <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
                    <FieldGroup>
                        <form.Field
                            name="name"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="text"
                                            placeholder="John Doe"
                                            onChange={e => field.handleChange(e.target.value)}
                                            value={field.state.value}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}

                        />
                        <form.Field
                            name="bio"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                                        <Textarea
                                            id={field.name}
                                            placeholder="Hey, I am using medistore"
                                            onChange={e => field.handleChange(e.target.value)}
                                            value={field.state.value || ""}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}

                        />
                        <form.Field
                            name="contact"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Contact</FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="text"
                                            placeholder="01500000000"
                                            onChange={e => field.handleChange(e.target.value)}
                                            value={field.state.value || ""}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}

                        />
                        <form.Field
                            name="age"
                            children={(field) => {
                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Age</FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="text"
                                            placeholder="e.g 21"
                                            onChange={e => field.handleChange(e.target.value)}
                                            value={field.state.value || ""}
                                            aria-invalid={isInvalid}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                )
                            }}

                        />
                        {
                            user.role === UserRole.SELLER &&
                            <form.Field
                                name="storeName"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Store Name</FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="e.g Medico"
                                                onChange={e => field.handleChange(e.target.value)}
                                                value={field.state.value || ""}
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}

                            />
                        }
                    </FieldGroup>
                    <div className="flex! justify-between mt-6">
                        <Link href={"/profile"}>
                            <Button variant={"outline"}>Cancel</Button>
                        </Link>
                        {
                            loading ?
                                <Button disabled >Updating <Spinner /></Button>
                                :
                                <Button type="submit" className="cursor-pointer">Update</Button>
                        }
                    </div>
                </form>
            </CardContent>
            <Toaster position="top-center" />
        </Card >
    );
}