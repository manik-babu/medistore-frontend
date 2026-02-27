"use client"

import { ReviewCard } from "@/components/reviews/ReviewCard"
import { ReviewData } from "@/types"
import { MessageSquare, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { PageLoader } from "../ui/Loader"
import { getReviews } from "@/actions/review.actions"
import { toast } from "sonner"
import { useAppSelector } from "@/redux/hooks"
import { Card } from "../ui/card"
import { Field, FieldContent, FieldLabel, FieldTitle } from "../ui/field"
import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import WriteReview from "../ui/WriteReview"
import { UserRole } from "@/constants/userRole"

export function ReviewsList({ medicineId }: { medicineId: string }) {
    const [reviewData, setReviewData] = useState<ReviewData | null>(null);
    const [oldestFirst, setOldestFirst] = useState(false);
    const [rating, setRating] = useState<string>('-1');
    const session = useAppSelector((state) => state.user);
    const [fetchingReview, setFetchingReview] = useState(false);

    const fetchReview = async (oldestFirst: boolean, rating: string) => {
        setFetchingReview(true);
        try {
            const res = await getReviews(medicineId, oldestFirst, rating);
            if (!res.data) {
                toast.error(res.error || "Unable to load reviews");
                return;
            }
            if (!res.data.ok) {
                toast.error(res.data.message || "Unable to load reviews");
            }
            else {
                setReviewData(res.data.data);
            }

        } catch (error: any) {
            toast.error(error.message || "Unable to load reviews");
        }
        finally {
            setFetchingReview(false);
        }
    }
    useEffect(() => {
        fetchReview(oldestFirst, rating);
    }, [oldestFirst, rating]);

    if (reviewData === null) {
        return <PageLoader message="Loading review" />
    }

    return (
        <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold mb-4">
                Customer Reviews ({reviewData.meta.total})
            </h3>
            <Card className="p-4">
                <FieldLabel className="w-36! h-11! flex justify-center">
                    <Field orientation="horizontal" className="py-0! px-4 flex! justify-center items-center cursor-pointer">
                        <Checkbox checked={oldestFirst} onCheckedChange={() => setOldestFirst(!oldestFirst)} id="toggle-checkbox" name="oldest-first" />
                        <FieldContent>
                            <FieldTitle>Oldest First</FieldTitle>
                        </FieldContent>
                    </Field>
                </FieldLabel>
                <RadioGroup defaultValue="-1" onValueChange={(value) => setRating(value)} className="flex flex-wrap">
                    {
                        [-1, 1, 2, 3, 4, 5].map((star) => (
                            <FieldLabel key={star.toString()} htmlFor={star.toString()} className="w-16! cursor-pointer">
                                <Field>
                                    <FieldContent>
                                        <FieldTitle className="w-9!">
                                            {
                                                star === -1 ?
                                                    <>All</>
                                                    :
                                                    <div className="flex items-center gap-1 w-20">
                                                        <span className="text-sm font-medium">{star}</span>
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    </div>
                                            }
                                        </FieldTitle>
                                    </FieldContent>
                                    <RadioGroupItem hidden value={star.toString()} id={star.toString()} />
                                </Field>
                            </FieldLabel>
                        ))
                    }

                </RadioGroup>
            </Card>
            <div className="relative">
                {
                    session?.role !== UserRole.CUSTOMER &&
                    <div className="absolute rounded-lg top-0 left-0 h-full w-full flex justify-center items-center bg-[#bababa33] text-muted-foreground">
                        <h1>Only customer can write review</h1>
                    </div>

                }
                <WriteReview setReviewData={setReviewData} reviewData={reviewData} medicineId={medicineId} />
            </div>
            {
                fetchingReview ?
                    <PageLoader message="Loading review" />
                    :
                    reviewData.reviews.length === 0 ?
                        <div className="text-center py-12">
                            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                            <p className="text-muted-foreground">
                                Be the first to review this product
                            </p>
                        </div>
                        :
                        reviewData.reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                setReviewData={setReviewData}
                                currentUserId={session?.id}
                                reviewData={reviewData}
                            />
                        ))
            }
        </div>
    )
}