export interface ReviewData {
    reviews: Review[];
    meta: Meta;
}

export interface Review {
    id: string;
    medicineId: string;
    content: string;
    rating: number;
    authorId: string;
    storeReply: null;
    createdAt: string;
    updatedAt: string;
    author: Author;
    medicine: Medicine;
}

export interface Author {
    id: string;
    name: string;
    image: null;
}

export interface Medicine {
    authorId: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}
