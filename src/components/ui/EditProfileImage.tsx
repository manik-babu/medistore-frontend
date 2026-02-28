"use client"

import { Upload, Trash2 } from "lucide-react"
import { Button } from "./button";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { updateProfileImage } from "@/actions/user.action";
import { toast } from "sonner";
import { Spinner } from "./spinner";
type UploadImageProps = {
    image: string | null;
    name: string;
}
export const EditProfileImage = ({ image, name }: UploadImageProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false)

    const handleUpdate = async () => {
        setSaving(true);
        try {
            if (!file) {
                return;
            }
            const res = await updateProfileImage(file);
            if (res.error) {
                toast.error(res.error);
                return;
            }

            if (!res.data.ok) {
                toast.error(res.data.message);
            }
            else {
                toast.success(res.data.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
        finally {
            setSaving(false);
        }
    }

    return (
        <div className='mt-4 w-full flex gap-4 justify-center items-center flex-col'>
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={file ? URL.createObjectURL(file) : image ? image : `https://api.dicebear.com/7.x/initials/svg?seed=${name}`} />
                <AvatarFallback className="text-2xl font-bold">
                    {name}
                </AvatarFallback>
            </Avatar>
            <input onChange={(e: any) => setFile(e.target.files[0])} hidden type="file" name="images" id="img-1" accept='image/*' />
            <div>
                {
                    !file ?
                        <label className='flex justify-center items-center h-9! dark:bg-white bg-black text-white dark:text-black rounded-2xl font-bold gap-2 w-49 cursor-pointer' htmlFor="img-1">
                            <><Upload /><span className='text-[0.8rem]'>Upload</span></>
                        </label>
                        :
                        <div className="flex gap-2">
                            <Button className="h-9 rounded-full w-32" variant={"outline"} onClick={() => setFile(null)}>Cancel</Button>
                            <Button className="h-9 rounded-full w-32" onClick={handleUpdate} disabled={saving}>
                                {
                                    saving ?
                                        <>Saving <Spinner /></>
                                        :
                                        "Save"
                                }
                            </Button>
                        </div>
                }
            </div>
        </div>
    )
}
