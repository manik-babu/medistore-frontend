"use client"

import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type RatingsOverviewProps = {
    total: {
        _avg: {
            rating: number | null
        }
        _count: number
    }
    single: Array<{
        _count: number
        rating: number
    }>
}

export function RatingsOverview({ data }: { data: RatingsOverviewProps }) {
    const { total, single } = data
    const averageRating = total._avg.rating || 0
    const totalReviews = total._count

    // Create a map of rating counts (1-5 stars)
    const ratingMap = new Map<number, number>()
    single.forEach((item) => {
        ratingMap.set(item.rating, item._count)
    })

    // Calculate percentage for each rating
    const getRatingPercentage = (rating: number) => {
        const count = ratingMap.get(rating) || 0
        return totalReviews > 0 ? (count / totalReviews) * 100 : 0
    }

    // Handle case when there are no reviews
    if (totalReviews === 0) {
        return (
            <Card className="mt-6 w-full">
                <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">
                        <div className="flex items-center justify-center gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-6 w-6 text-gray-300" />
                            ))}
                        </div>
                        <p className="text-muted-foreground">No reviews yet</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Be the first to review this product
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side - Average Rating */}
                    <div className="flex flex-col items-center justify-center text-center border-r-0 md:border-r pr-0 md:pr-8">
                        <div className="text-5xl font-bold mb-2">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 ${star <= Math.round(averageRating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
                        </p>
                    </div>

                    {/* Right Side - Rating Distribution */}
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = ratingMap.get(rating) || 0
                            const percentage = getRatingPercentage(rating)

                            return (
                                <div key={rating} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-20">
                                        <span className="text-sm font-medium">{rating}</span>
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <Progress value={percentage} className="flex-1 h-2" />
                                    <span className="text-sm text-muted-foreground w-12 text-right">
                                        {count}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}