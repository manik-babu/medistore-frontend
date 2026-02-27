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