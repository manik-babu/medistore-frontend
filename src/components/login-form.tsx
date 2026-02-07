"use client"

import { cn } from "@/lib/utils"
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
import Link from "next/link"
import { authClient, signInWithGoogle } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import z from "zod";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSession } from "@/actions/user.action"
import { toast } from "sonner"
import { useAppDispatch } from "@/redux/hooks"
import { Toaster } from "./ui/sonner"
import { setUser } from "@/redux/slice/userSlice"
import { Spinner } from "./ui/spinner"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Must be at least 8 characters long.")

});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const [formError, setformError] = useState<string | null>(null);
  const [loading, setloading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setloading(true);
        const { data, error } = await authClient.signIn.email(value);
        setloading(false)
        if (error) {
          setformError(error?.message || "Something went wrong")
        }
        else {
          const { data, error } = await getSession();
          if (error || !data) {
            toast.error("Login faild! Try again");
            return;
          }
          dispatch(setUser({ id: data.id, name: data.name, role: data.role, image: data.image }));
          router.push("/profile");
        }
      } catch (error) {
        console.log(error);
        toast.error("Login faild! Try again");
      }
    },

  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {formError && <CardDescription className="text-red-500">
            {formError}
          </CardDescription>}
        </CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); form.handleSubmit(); }}>
            <FieldGroup>
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
                    </Field>
                  )
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <div className="flex items-center">
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id={field.name}
                        type="password"
                        onChange={e => { field.handleChange(e.target.value); setformError(null); }}
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
                    <Button disabled>Logging in <Spinner /></Button>
                    :
                    <Button type="submit" className="cursor-pointer">Login</Button>
                }
                <Button onClick={signInWithGoogle} variant="outline" type="button" className="cursor-pointer">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <Toaster position="top-center" />
    </div>
  )
}
