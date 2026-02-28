import { ShopBanner } from "@/components/shop/ShopBanner";
import { ShopPage } from "@/components/shop/ShopPage";
export const dynamic = "force-dynamic";
export default async function Shop() {
    return (
        <div className="flex flex-col mt-20 md:px-[5vw] px-4">
            <ShopBanner />
            <ShopPage />
        </div>
    );
}