"use client"

import { Star } from "lucide-react";
import { Dispatch, useState } from "react";

const labels: { [index: string]: string } = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}
type HoverRatingProps = {
    ratings: [rating: number, setRating: Dispatch<number>]
}
export default function HoverRating({ ratings: [rating, setRating] }: HoverRatingProps) {
    const [hover, setHover] = useState(rating);
    const starStyle = (star: number) => {
        if (star <= hover)
            return "fill-yellow-400 text-yellow-400";
        else
            return "fill-gray-400 text-gray-400"
    }
    return (
        <div>
            <h1>{labels[hover]}</h1>
            <div className="flex gap-2 mb-6" onMouseOut={() => setHover(rating)}>
                {
                    [1, 2, 3, 4, 5].map((star) => (
                        <Star onClick={() => setRating(star)} onMouseOver={() => setHover(star)} key={star.toString()} className={`cursor-pointer h-8 w-8 hover:scale-116 transition-all ${starStyle(star)}`} />
                    ))
                }
            </div>
        </div>
    );
}
