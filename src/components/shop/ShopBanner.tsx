import { Package } from "lucide-react";

export function ShopBanner() {
    return (
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Find Your Medicines</h2>
                    <p className="text-muted-foreground">
                        Browse verified medicines with fast delivery
                    </p>
                </div>
                <Package className="h-12 w-12 text-primary hidden md:block" />
            </div>
        </div>
    )
}