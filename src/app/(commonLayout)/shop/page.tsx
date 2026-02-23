import { ShopPage } from "@/components/shop/ShopPage";
import { shopService } from "@/services/shop.service";
export const dynamic = "force-dynamic";
export default async function Shop() {
    const res = await shopService.getMedicines({
        searchText: "",
        categoryId: "all",
        sortBy: "relevance",
        page: 1
    });
    if (!res.data) {
        throw new Error(res.error || "Unable to load medicine")
    }
    if (!res.data.ok) {
        throw new Error("Unable to load medicine");
    }
    return (
        <div className="flex flex-col mt-20 md:px-[5vw] px-4">
            <h1 className="font-bold text-2xl mt-4">For sale</h1>
            <ShopPage medicines={res.data.data} />
        </div>
    );
}