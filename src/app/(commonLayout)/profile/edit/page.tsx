import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/components/profile/ProfilePage";
import EditProfile from "@/components/profile/EditProfile";
export const dynamic = 'force-dynamic';
export default async function Profile() {
    const { data, error: sessionError } = await userService.getSession();
    if (sessionError) {
        throw new Error("Something went wrong");
    }
    if (!data) {
        redirect("/login");
    }
    const { data: userDetails, error } = await userService.getUserDetails();
    if (error) {
        throw new Error(error || "Something went wrong to load profile!");
    }
    if (!userDetails) {
        redirect("/login");
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-lg">
                <EditProfile user={userDetails} />
            </div>
        </div>
    );
}