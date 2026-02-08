import CheckoutPage from "@/components/checkout/CheckoutPage";
import { userService } from "@/services/user.service";
import { CartItem } from "@/types";

export type FormatedOrders = Record<string, { totalPrice: number, carts: CartItem[] }>
export type FormatedDataForOrder = Record<string, string[]>
export default async function Checkout() {
    const { data, error } = await userService.getCarts();
    if (error) {
        throw new Error(error);
    }
    if (data && !data.ok) {
        throw new Error(data.message);
    }
    const formatedData: FormatedOrders = data.data.reduce((formated: FormatedOrders, cart: CartItem) => {
        if (!formated[cart.medicine.author.id]) {
            formated[cart.medicine.author.id] = { totalPrice: 60, carts: [] };
        }
        formated[cart.medicine.author.id].totalPrice += (cart.quantity * parseFloat(cart.medicine.price));
        formated[cart.medicine.author.id].carts.push(cart);
        return formated;
    }, {});
    const formatedDataForOrder: FormatedDataForOrder = data.data.reduce((formated: FormatedDataForOrder, cart: CartItem) => {
        if (!formated[cart.medicine.author.id]) {
            formated[cart.medicine.author.id] = [];
        }
        formated[cart.medicine.author.id].push(cart.id);
        return formated;
    }, {});
    return (
        <CheckoutPage orders={formatedData} formatedDataForOrder={formatedDataForOrder} />
    );
}