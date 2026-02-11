import { CartPage } from "@/components/cart/CartPage";
import { SimpleNavbar } from "@/components/cart/SimpleNavbar";

export const dynamic = "force-dynamic"
export default function Carts() {
    return (
        <div className="mt-20">
            <CartPage />
        </div>
    );
}