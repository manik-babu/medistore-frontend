"use client"

import { ToastContainer, toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient, signInWithGoogle } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import Link from "next/link"
import { useState } from "react"
import z from "zod";
import { RadioGroupDescription } from "./ui/radioGroup"
import { UserRole } from "@/constants/userRole"
import { redirect } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string().min(8, "Must be at least 8 characters long."),
  role: z.enum([UserRole.CUSTOMER, UserRole.SELLER])
})

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [formError, setformError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.CUSTOMER
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      try {
        console.log({ value })
        const { data, error } = await authClient.signUp.email(value);

        if (error) {
          console.error("Signup error:", error);
          if (error.message)
            setformError(error.message);
        }
        else {
          toast.success("Signup successfull");
          setTimeout(() => {
            redirect("/login");
          }, 1500);
        }
      } catch (error) {
        console.log(error)
      }
    }

  })
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
        {formError && <CardDescription className="text-red-500">
          {formError}
        </CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={e => { e.preventDefault(); form.handleSubmit(); }}>
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
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      onChange={e => { field.handleChange(e.target.value); setformError(null); }}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your email
                      with anyone else.
                    </FieldDescription>
                  </Field>
                )
              }}

            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      type="password"
                      onChange={e => field.handleChange(e.target.value)}
                      value={field.state.value}
                      aria-invalid={isInvalid}

                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                  </Field>
                )
              }}
            />
            <FieldGroup>
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Select how you'd like to use MediStore.</FieldLabel>
                      <RadioGroup defaultValue={UserRole.CUSTOMER} onValueChange={field.handleChange} className="w-fit">
                        <Field orientation="horizontal">
                          <RadioGroupItem value={UserRole.CUSTOMER} id="desc-r1" />
                          <FieldContent>
                            <FieldLabel htmlFor="desc-r1">Customer</FieldLabel>
                            <FieldDescription>
                              Browse, purchase medicines and manage your orders.
                            </FieldDescription>
                          </FieldContent>
                        </Field>
                        <Field orientation="horizontal">
                          <RadioGroupItem value={UserRole.SELLER} id="desc-r2" />
                          <FieldContent>
                            <FieldLabel htmlFor="desc-r2">Seller</FieldLabel>
                            <FieldDescription>List and sell medicines, manage your pharmacy inventory.</FieldDescription>
                          </FieldContent>
                        </Field>
                      </RadioGroup>
                    </Field>
                  )
                }}
              />
            </FieldGroup>
            <FieldGroup>
              <Field>
                <Button type="submit" className="cursor-pointer">Create Account</Button>
                <Button onClick={signInWithGoogle} variant="outline" type="button" className="cursor-pointer">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
      <ToastContainer position='top-center' />
    </Card>
  )
}
