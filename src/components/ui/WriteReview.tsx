"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { ReviewData } from "@/types";
import HoverRating from "./ReviewStar";
import { addReview } from "@/actions/review.actions";
import { toast } from "sonner";

type WriteReviewProps = {
    setReviewData: Dispatch<SetStateAction<ReviewData | null>>;
    medicineId: string;
    reviewData: ReviewData;
}

export default function WriteReview({ setReviewData, reviewData, medicineId }: WriteReviewProps) {
    const [rating, setRating] = useState<number>(2);
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const handleReview = async () => {
        setLoading(true);
        try {
            const res = await addReview({ medicineId, rating, content });
            console.log(res)
            if (!res.data) {
                toast.error(res.error || "Unable to add review");
                return;
            }
            if (!res.data.ok) {
                toast.error(res.data.message || "Unable to add review");
            }
            else {
                toast.success("Review added")
                setReviewData({
                    reviews: [res.data.data, ...reviewData.reviews],
                    meta: reviewData.meta
                })
                setContent("");
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.message || "Unable to add review")
        }
        finally {
            setLoading(false);

        }
    }

    return (
        <Card className="gap-4">
            <CardHeader>
                <CardTitle>Write a customer review</CardTitle>
            </CardHeader>
            <CardContent>
                <HoverRating ratings={[rating, setRating]} />
                <Textarea
                    name="content"
                    placeholder="Leave a feedback"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="mt-6 flex justify-between">
                    <Button variant={"outline"} onClick={() => setContent("")}>Clear</Button>
                    <Button onClick={handleReview}>Submit</Button>
                </div>

            </CardContent>
        </Card>
    );
}