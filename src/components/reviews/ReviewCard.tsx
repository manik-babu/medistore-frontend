"use client"

import { Star, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Meta, Review, ReviewData } from "@/types"
import { deleteReview } from "@/actions/review.actions"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { Spinner } from "../ui/spinner"
import { Textarea } from "../ui/textarea"
import { reviewResponse } from "@/actions/seller.actions"
import { useAppSelector } from "@/redux/hooks"
import { UserRole } from "@/constants/userRole"
import BanUser from "../ui/BanUser"


interface ReviewCardProps {
    review: Review
    currentUserId?: string
    className?: string;
    setReviewData: Dispatch<SetStateAction<ReviewData | null>>
    reviewData: ReviewData
}

export function ReviewCard({ review, currentUserId, setReviewData, reviewData, className = "" }: ReviewCardProps) {
    const { author, rating, content, createdAt, storeReply } = review
    const [deleting, setDeleting] = useState(false);
    const [openResponse, setOpenResponse] = useState(false);
    const [responding, setResponding] = useState(false);
    const [responseContent, setResponseContent] = useState<string>("");
    const [responseError, setResponseError] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await deleteReview(review.id);
            if (!res.data) {
                toast.error(res.error || "Review deletion failed");
                return;
            }
            if (!res.data.ok) {
                toast.error(res.data.message || "Review deletion failed");
            }
            else {
                console.log(res.data)
                setReviewData((prev) => {
                    console.log(prev);
                    if (prev) {
                        return {
                            meta: prev.meta as Meta,
                            reviews: prev.reviews.filter((review) => review.id !== res.data.data.id)
                        }
                    }
                    else {
                        return null;
                    }
                })
                toast.success(res.data.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Review delete failed")
        }
        finally {
            setDeleting(false);
        }
    }

    const handleResponse = async () => {
        if (!responseContent) {
            setResponseError("Response content is required")
            return;
        }
        setResponding(true);
        try {
            const res = await reviewResponse(responseContent, review.id);
            if (!res.data) {
                toast.error(res.error || "Response failed");
                return;
            }
            if (!res.data.ok) {
                toast.error(res.data.message || "Response failed");
            }
            else {
                setReviewData({
                    meta: reviewData.meta,
                    reviews: reviewData.reviews.map((item) => item.id === review.id ? res.data.data : item)
                })
                toast.success(res.data.message);
                setOpenResponse(false);
            }
        } catch (error: any) {
            toast.error(error.message || "Review respond failed")
        }
        finally {
            setResponding(false);
        }
    }

    return (
        <Card className={className}>
            <CardContent className="pt-6 relative">
                {
                    currentUserId && review.author.id == currentUserId &&
                    <Button onClick={handleDelete} className="absolute top-0 right-6" variant={"destructive"} disabled={deleting} ><Trash2 /> {deleting && <Spinner />}</Button>
                }
                {
                    currentUserId && review.medicine.authorId == currentUserId && !review.storeReply &&
                    <Button onClick={() => setOpenResponse(true)} className="absolute top-0 right-6" disabled={deleting} >Respond</Button>
                }
                {/* Review Header */}
                <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={author.image || undefined} alt={author.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(author.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{author.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                                {formatDate(createdAt)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Review Content */}
                <p className="text-muted-foreground leading-relaxed mb-4">
                    {content}
                </p>

                {/* Store Reply */}
                {storeReply && (
                    <div className="mt-4 ml-4 pl-4 border-l-2 border-primary/20 bg-muted/30 p-4 rounded-r-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                                Seller Response
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{storeReply}</p>
                    </div>
                )}
            </CardContent>
            {
                openResponse &&
                <div className="px-6">
                    <Textarea
                        aria-invalid={!!responseError}
                        name="storeReply"
                        placeholder="Write response"
                        onChange={(e) => { setResponseContent(e.target.value); setResponseError(null) }}
                        value={responseContent}
                    />
                    {
                        responseError && <p className="text-red-500 text-sm mt-1">{responseError}</p>
                    }
                    <div className="w-full flex justify-between items-center mt-4">
                        <Button onClick={() => setOpenResponse(false)} variant={"outline"}>Cancel</Button>
                        <Button onClick={handleResponse} disabled={responding}>
                            {
                                responding ?
                                    <>Responding <Spinner /></>
                                    :
                                    "Respond"
                            }
                        </Button>
                    </div>
                </div>
            }
        </Card>
    )
}