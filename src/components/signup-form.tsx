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
import { UserRole } from "@/constants/userRole"
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Spinner } from './ui/spinner';
import SignupSuccessAlert from './ui/SignupSuccessAlert';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string().min(8, "Must be at least 8 characters long."),
  role: z.enum([UserRole.CUSTOMER, UserRole.SELLER]),
  storeName: z.string().nullable()
}).refine((data) => {
  if (data.role === UserRole.SELLER) {
    return data.storeName && data.storeName.trim().length > 0;
  }
  return true;
}, {
  message: "Store name is required",
  path: ["storeName"],
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [formError, setformError] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [signUpSuccess, setsignUpSuccess] = useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: UserRole.CUSTOMER,
      storeName: null as string | null
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      try {
        if (value.role === UserRole.ADMIN) {
          toast.error("Signup faild! Please select valid role");
          return;
        }
        if (value.role === UserRole.CUSTOMER) {
          value.storeName = null;
        }
        console.log({ value })
        setloading(true);
        const { data, error } = await authClient.signUp.email(value);
        setloading(false);
        if (error) {
          if (error.message)
            setformError(error.message);
        }
        else {
          setsignUpSuccess(true);

        }
      } catch (error) {
        setloading(true);
        toast.error("Something went wrong")
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
                name="role"
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
              <form.Subscribe
                selector={(state) => state.values.role}
                children={(roleValue) => (
                  <>
                    {
                      roleValue === UserRole.SELLER &&
                      <form.Field
                        name="storeName"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>Store Name</FieldLabel>
                              <Input
                                id={field.name}
                                type="text"
                                placeholder="Medico"
                                onChange={e => field.handleChange(e.target.value)}
                                value={field.state.value || ""}
                                aria-invalid={isInvalid}
                              />
                              {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              <FieldDescription>
                                The name of your pharmacy or medicine store.
                              </FieldDescription>
                            </Field>
                          )
                        }}

                      />
                    }
                  </>
                )}
              />

            </FieldGroup>
            <FieldGroup>
              <Field>
                {
                  loading ?
                    <Button disabled >Creating <Spinner /></Button>
                    :
                    <Button type="submit" className="cursor-pointer">Create Account</Button>
                }
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
      <SignupSuccessAlert signUpSuccess={signUpSuccess} />
      <ToastContainer position='top-center' />
    </Card>
  )
}
