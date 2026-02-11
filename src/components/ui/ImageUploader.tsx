"use client"

import { Upload, Trash2 } from "lucide-react"
import { Button } from "./button";
import { useMemo } from "react";
type UploadImageProps = {
    handleImage: (e: any) => void;
    handleRemove: () => void;
    image: File | null;
}
export const UploadImage = ({ handleImage, handleRemove, image }: UploadImageProps) => {
    const imageUrl = useMemo(() => {
        if (!image) return null;
        return URL.createObjectURL(image);
    }, [image]);

    return (
        <div className='dark-text mt-4'>
            {
                image && imageUrl &&
                <div className='flex gap-1 w-full overflow-x-auto auto my-4'>
                    <div className='relative w-49'>
                        <img className='w-full rounded-md border' src={imageUrl} alt={'image'} />
                    </div>
                </div>
            }
            <input onChange={handleImage} hidden type="file" name="images" id="img-1" accept='image/*' />
            {
                !imageUrl ?
                    <label className='flex justify-center items-center h-11 dark:bg-white bg-black text-white dark:text-black rounded-2xl font-bold gap-2 w-49 cursor-pointer' htmlFor="img-1">
                        <><Upload /><span className='text-[0.8rem]'>Upload</span></>
                    </label>
                    :

                    <div onClick={handleRemove} className='flex justify-center items-center h-11 bg-red-500 text-white rounded-2xl font-bold gap-2 w-49 cursor-pointer'>
                        <><Trash2 /><span className='text-[0.8rem]'>Remove</span></>
                    </div>
            }
        </div>
    )
}
