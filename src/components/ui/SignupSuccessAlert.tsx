import { CheckCircle2, ArrowRight } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle } from "./alert-dialog";
import Link from "next/link";

export default function SignupSuccessAlert({ signUpSuccess }: { signUpSuccess: boolean }) {
    return (
        <AlertDialog open={signUpSuccess}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle2 className="h-6 w-6" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Account Created</AlertDialogTitle>
                    <AlertDialogDescription className="text-center space-y-2">
                        We've sent a verification email to your inbox. Please verify your account before logging in.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full flex!">
                    <Link href={'/login'} className="w-full flex!">
                        <AlertDialogAction variant="default" className="flex-1 cursor-pointer">
                            Go to Login <ArrowRight />
                        </AlertDialogAction>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}