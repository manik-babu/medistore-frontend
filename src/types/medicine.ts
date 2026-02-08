export type MedicineData = {
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

    author: {
        id: string
        storeName: string
        image: string | null
    }

    _count: {
        carts: number
    }
}
