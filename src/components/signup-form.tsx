"use client"

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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string().min(8, "Must be at least 8 characters long."),
})

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [formError, setformError] = useState<string | null>(null);
  const [role, setrole] = useState<string>(UserRole.CUSTOMER)
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      console.log({ ...value, role });
      try {
        const { data, error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name
        });

        if (error) {
          console.error("Signup error:", error);
          if (error.message)
            setformError(error.message);
        }
        else {
          console.log("Signup success:", data);
        }
      } catch (error) {
        console.log(error)
      }
    }

  })
  const handleRoleChange = (value: string) => {
    console.log(value)
    setrole(value);
  }
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
              <FieldLabel>Select how you'd like to use MediStore.</FieldLabel>
              <RadioGroupDescription handleRoleChange={handleRoleChange} />
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
    </Card>
  )
}
