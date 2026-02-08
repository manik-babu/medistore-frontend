"use client"
import { FormatedDataForOrder, FormatedOrders } from "@/app/(commonLayout)/customer/checkout/page";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { OrderData } from "@/types";
import { Toaster } from "../ui/sonner";
import { placeOrder } from "@/actions/user.action";
import { useAppDispatch } from "@/redux/hooks";
import { setCartValue } from "@/redux/slice/cartSlice";
import OrderSuccessAlert from "./SuccessOrder";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().regex(/^01[3-9]\d{8}$/, "Please enter a valid Bangladeshi mobile number"),
    division: z.string().min(1, "Division is required"),
    district: z.string().min(1, "Division is required"),
    upazila: z.string().min(1, "Division is required"),
    additional: z.string()
})
export default function AddressForm({ orders }: { orders: FormatedDataForOrder }) {
    const dispatch = useAppDispatch();
    const [loading, setloading] = useState<boolean>(false);
    const [orderSuccess, setorderSuccess] = useState<boolean>(false)

    const form = useForm({
        defaultValues: {
            name: "",
            phone: "",
            division: "",
            district: "",
            upazila: "",
            additional: ""
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                const data: OrderData = {
                    name: value.name,
                    phone: value.phone,
                    address: `Division: ${value.division}, District: ${value.district}, Upazila/Thana: ${value.upazila}, ${value.additional}`,
                    orders: orders
                };
                setloading(true);
                const res = await placeOrder(data);

                if (res.error) {
                    throw new Error();
                }
                if (res.data.ok) {
                    setorderSuccess(true);
                    dispatch(setCartValue(0));
                    console.log(res.data)
                }
                else {
                    toast.error(res.data.message)
                }

            } catch (error) {
                toast.error("Something went wrong! Try again");
            }
            finally {
                setloading(false);
            }
        }
    })
    return (
        <div className="w-full mt-20 flex justify-center">
            <Card className="w-sm">
                <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                    <CardDescription>
                        Enter the recipient’s contact details and delivery address.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={e => { e.preventDefault(); form.handleSubmit(); }}>

                        <FieldGroup>
                            <form.Field
                                name="name"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name} className="gap-1"><span>Name</span><span className="text-red-600">*</span></FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="Enter full name"
                                                onChange={e => { field.handleChange(e.target.value) }}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            />
                            <form.Field
                                name="phone"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name} className="gap-1"><span>Mobile Number</span><span className="text-red-600">*</span></FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="e.g. 01XXXXXXXXX"
                                                onChange={e => { field.handleChange(e.target.value) }}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            />
                            <form.Field
                                name="division"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name} className="gap-1"><span>Division</span><span className="text-red-600">*</span></FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="Select your division"
                                                onChange={e => { field.handleChange(e.target.value) }}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            />
                            <form.Field
                                name="district"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name} className="gap-1"><span>District</span><span className="text-red-600">*</span></FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="Select your district"
                                                onChange={e => { field.handleChange(e.target.value) }}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            />
                            <form.Field
                                name="upazila"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name} className="gap-1"><span>Upazila / Thana</span><span className="text-red-600">*</span></FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="Select your upazila or thana"
                                                onChange={e => { field.handleChange(e.target.value) }}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            />
                            <form.Field
                                name="additional"
                                children={(field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel htmlFor={field.name}>Detailed Address (Optional)</FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="text"
                                                placeholder="House no, Road no, Area"
                                                onChange={e => { field.handleChange(e.target.value) }}
                                                value={field.state.value}
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                        </Field>
                                    )
                                }}
                            />
                            <Field>
                                {
                                    loading ?
                                        <Button disabled>Placing <Spinner /></Button>
                                        :
                                        <Button type="submit" className="cursor-pointer">Place Order</Button>
                                }
                            </Field>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <OrderSuccessAlert orderSuccess={orderSuccess} />
            <Toaster position="top-center" />
        </div>
    )
}