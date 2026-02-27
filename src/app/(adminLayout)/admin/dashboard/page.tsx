import AdminDashboard from "@/components/admin/Dashboard";
import { ErrorPage } from "@/components/shop/ErrorPage";
import { adminService } from "@/services/admin.service";

export default async function Dashboard() {
    const res = await adminService.getStatics();
    if (!res.data) {
        throw new Error(res.error);
    }
    if (!res.data.ok) {
        return (
            <ErrorPage
                message={res.data.message}
                statusCode={res.data.status}
            />
        )
    }
    return (
        <AdminDashboard data={res.data.data} />
    );
}