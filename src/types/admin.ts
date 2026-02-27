export interface AdminStatics {
    customer: Customer;
    seller: Customer;
    medicine: Medicine;
    order: Order;
}

export interface Customer {
    total: number;
    banned: number;
}

export interface Medicine {
    total: number;
    featured: number;
    banned: number;
}

export interface Order {
    total: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
}
