import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/components/profile/ProfilePage";
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
    if (!userDetails) {
        redirect("/login");
    }
    return (
        <div className="mt-20">
            <ProfilePage user={userDetails} />
        </div>
    );
}