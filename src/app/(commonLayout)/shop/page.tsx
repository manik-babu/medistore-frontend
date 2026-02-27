import { ShopPage } from "@/components/shop/ShopPage";
export const dynamic = "force-dynamic";
export default async function Shop() {
    return (
        <div className="flex flex-col mt-20 md:px-[5vw] px-4">
            <h1 className="font-bold text-2xl mt-4">For sale</h1>
            <ShopPage />
        </div>
    );
}