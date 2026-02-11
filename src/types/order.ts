export type OrderData = {
    name: string;
    phone: string;
    address: string;
    orders: Record<string, string[]>
}

export type Order = {
    id: string,
    customerId: string,
    sellerId: string,
    status: OrderStatus,
    address: string,
    phone: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    totalPrice: number
}

export enum OrderStatus {
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"

}