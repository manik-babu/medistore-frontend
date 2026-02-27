"use server"

import { reviewService } from "@/services/review.service"

export const getReviews = async (medicineId: string, oldestFirst: boolean, rating: string) => {
    return await reviewService.getReviews(medicineId, oldestFirst, rating);
}
export const deleteReview = async (reviewId: string) => {
    return await reviewService.deleteReview(reviewId);
}
export const addReview = async (data: { medicineId: string; rating: number, content: string }) => {
    return await reviewService.addReview(data);
}
