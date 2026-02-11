import { CheckCircle2, ArrowRight } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle } from "./alert-dialog";
import Link from "next/link";

export default function MedicineAddedAlert({ success, handleAddAnother }: { success: boolean; handleAddAnother: () => void }) {
    return (
        <AlertDialog open={success}>
            <AlertDialogContent size="sm" className="py-10">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle2 className="h-6 w-6" />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Medicine Added</AlertDialogTitle>
                    <AlertDialogDescription className="text-center space-y-2">
                        Your medicine is now online.Wait for customer order
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-full flex!">
                    <Link href={'/seller/medicines'} className="flex!">
                        <AlertDialogAction variant="outline" className="flex-1 cursor-pointer">
                            My Medicines
                        </AlertDialogAction>
                    </Link>
                    <AlertDialogAction onClick={handleAddAnother} variant="default" className="flex-1 cursor-pointer">
                        Add Another
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}