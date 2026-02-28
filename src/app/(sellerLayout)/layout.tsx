import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediStore - Seller",
    description: "Seller dashboard for managing products, inventory, orders, and sales performance on MediStore."
};
export const dynamic = "force-dynamic"
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="relative">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b ">
                        <div className="flex items-center gap-2 px-3">
                            <SidebarTrigger />
                        </div>
                    </header>
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}