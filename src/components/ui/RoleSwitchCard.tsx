"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowRight, CheckCircle2, Stone, Store } from "lucide-react"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle } from "./alert-dialog"
import { Input } from "./input"
import { FieldDescription } from "./field"
import { changeRole } from "@/actions/user.action"
import { toast } from "sonner"
import { Toaster } from "./sonner"
import { Spinner } from "./spinner"
export default function RoleSwitchCard() {
    const [openPopup, setopenPopup] = useState(false);
    const [storeName, setstoreName] = useState<string>("");
    const [nameError, setnameError] = useState<string | null>(null);
    const [loading, setloading] = useState(false)
    const onSwitch = async () => {
        setloading(true);
        try {
            if (!storeName) {
                setnameError("Store name is required");
                return;
            }
            const res = await changeRole(storeName);
            if (!res.data) {
                toast.error(res.error);
                return;
            }
            if (res.data.ok) {
                toast.success(res.data.message || "Role updated");
            }
            else {
                toast.error(res.data.message || "Operation failed");
            }

        } catch (error: any) {
            toast.error(error.message || "Operation failed");
        }
        finally {
            setloading(false);
        }
    }
    return (
        <Card className="w-full border bg-muted/40">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Left Content */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">Customer Account</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        You can switch to a Seller account within 2 days of registration.
                    </p>

                    <div className="flex items-center gap-2 text-xs text-amber-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span>This action is permanent and cannot be reversed.</span>
                    </div>
                </div>

                {/* Right Button */}
                <div className="w-full sm:w-auto">
                    <Button
                        onClick={() => setopenPopup(true)}
                        className="w-full sm:w-auto"
                    >
                        Become a Seller
                    </Button>
                </div>

            </CardContent>
            <AlertDialog open={openPopup}>
                <AlertDialogContent size="sm" className="py-10">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                            <Store />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Become a seller</AlertDialogTitle>
                        <AlertDialogDescription className="text-center space-y-2">
                            Enter a desire name of your store
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Input
                        name="storeName"
                        defaultValue={storeName}
                        onChange={e => { setstoreName(e.target.value); setnameError(null) }}
                        placeholder="e.g Medico"
                    />
                    {
                        nameError && <FieldDescription className="text-red-500">{nameError}</FieldDescription>
                    }
                    <AlertDialogFooter className="w-full flex!">
                        <AlertDialogAction onClick={() => setopenPopup(false)} variant="outline" className="flex-1 cursor-pointer">
                            Cancel
                        </AlertDialogAction>
                        {
                            loading ?
                                <AlertDialogAction variant="default" className="flex-1 cursor-pointer">
                                    Updating <Spinner />
                                </AlertDialogAction>
                                :
                                <AlertDialogAction onClick={onSwitch} variant="default" className="flex-1 cursor-pointer">
                                    Confirm
                                </AlertDialogAction>
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Toaster position="top-center" />
        </Card>
    )
}