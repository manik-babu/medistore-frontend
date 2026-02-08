export type CartItem = {
    id: string
    quantity: number
    createdAt: string
    medicine: {
        id: string
        name: string
        imageUrl: string
        price: string
        author: {
            id: string;
            storeName: string;
        }
    }
}