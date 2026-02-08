"use client"

import { Edit, Trash2, Trash2Icon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Spinner } from './spinner'
import { toast, ToastContainer } from 'react-toastify'
import { deleteMedicine } from '@/actions/seller.actions'
import { useRouter } from 'next/navigation'

export function DropdownMenuBasic({ medicine }: { medicine: { medicineId: string; name: string; } }) {
    const router = useRouter();
    const [deleting, setdeleting] = useState<boolean>(false)
    const [dialogOpen, setdialogOpen] = useState<boolean>(false);
    const handleDeleteClick = () => {
        setdialogOpen(true);
    }

    const handleDelete = async () => {
        setdeleting(true);
        const res = await deleteMedicine(medicine.medicineId);
        if (res.data) {

            if (res.data.ok) {
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message);
            }
        }
        else {
            toast.error("Something went wrong to delete");
        }
        setdeleting(false);
        setdialogOpen(false);
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Ellipsis className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => router.push(`/seller/medicines/edit/${medicine.medicineId}`)}><Edit /> Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDeleteClick} variant={"destructive"}><Trash2 /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Confimation popup */}
            <AlertDialog open={dialogOpen}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                            <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>Delete medicine?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {`"${medicine.name}"`}
                        </AlertDialogDescription>
                        <AlertDialogDescription className="text-2">
                            This will permanently delete the medicine from <strong>MediStore</strong>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant="outline" onClick={() => setdialogOpen(false)}>Cancel</AlertDialogCancel>
                        {
                            deleting ?
                                <AlertDialogAction onClick={handleDelete} variant="destructive" disabled>deleting <Spinner /></AlertDialogAction>
                                :
                                <AlertDialogAction onClick={handleDelete} variant="destructive">Delete</AlertDialogAction>

                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <ToastContainer position='top-center' />
        </>
    )
}
