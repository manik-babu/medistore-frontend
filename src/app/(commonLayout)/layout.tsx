import AppFooter from "@/components/layouts/AppFooter";
import Navbar from "@/components/layouts/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "MediStore",
    description: "MediStore online pharmacy platform providing genuine medicines, healthcare products, and a seamless shopping experience."
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div>
            <Navbar />
            <div className="mt-16">
                {children}
            </div>
            <AppFooter />
        </div>
    );
}