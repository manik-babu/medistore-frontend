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

// user
export interface AdminUserData {
    data: User[],
    meta: Meta

}
export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: null;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    contact: null;
    bio: null;
    age: null;
    isBanned: boolean;
    storeName: null;
}
export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}

