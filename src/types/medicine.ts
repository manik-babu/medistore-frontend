export type MedicineData = {
    medicine: {
        id: string
        imageUrl: string
        imageCloudinaryId: string
        price: string
        isBanned: boolean
        isFeatured: boolean
        authorId: string
        name: string
        description: string
        categoryId: string
        createdAt: string
        updatedAt: string
        category: {
            id: string
            name: string
        }
        _count: {
            carts: number
        }
        author: {
            id: string
            storeName: string
            image: string | null
        }
    }
    ratings: {
        total: {
            _avg: {
                rating: number
            },
            _count: number
        },
        single: {
            "_count": number,
            "rating": number
        }[] | []

    }
}
export interface ShopMedicine {
    data: Medicines[],
    meta: Meta
}

export interface Medicines {
    id: string;
    imageUrl: string;
    imageCloudinaryId: string;
    price: string;
    isBanned: boolean;
    isFeatured: boolean;
    authorId: string;
    name: string;
    description: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    author: Author;
    category: Category;
    _count: Count;
}

export interface Count {
    carts: number;
}

export interface Author {
    id: string;
    storeName: string;
    image: null;
}

export interface Category {
    id: string;
    name: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
}

