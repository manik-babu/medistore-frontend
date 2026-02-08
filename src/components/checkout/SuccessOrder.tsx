import { CheckCircle2, ArrowRight } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle } from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function OrderSuccessAlert({ orderSuccess }: { orderSuccess: boolean }) {
    return (
        <AlertDialog open={orderSuccess}>
            <AlertDialogContent size="sm" className="py-10">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle2 className="h-6 w-6" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Order Placed</AlertDialogTitle>
                    <AlertDialogDescription className="text-center space-y-2">
                        Your order has been placed successfully. You can track your order from your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full flex!">
                    <Link href={'/customer/orders'} className="w-full flex!">
                        <AlertDialogAction variant="default" className="flex-1 cursor-pointer">
                            View Order Details <ArrowRight />
                        </AlertDialogAction>
                    </Link>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}