import { ProfilePage } from "@/components/admin/users/ProfilePage";
import { ErrorPage } from "@/components/ErrorPage";
import { adminService } from "@/services/admin.service";

export default async function SecureUserProfile({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const res = await adminService.getUserDetails(userId);
    if (res.error) {
        throw new Error(res.error);
    }

    if (!res.data.ok) {
        <ErrorPage
            statusCode={res.data.status}
            message={res.data.message}
        />
    }
    return (
        <ProfilePage user={res.data.data} />
    );
}