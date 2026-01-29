"use client"

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserRole } from "@/constants/userRole"

export function RadioGroupDescription({ handleRoleChange }: { handleRoleChange: (value: string) => void }) {
    return (
        <RadioGroup defaultValue={UserRole.CUSTOMER} onValueChange={handleRoleChange} className="w-fit">
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
    )
}
