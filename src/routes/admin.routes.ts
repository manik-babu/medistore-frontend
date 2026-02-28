import { Route } from "@/types/route";

export const adminRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/admin/dashboard",
            },
        ],
    },
    {
        title: "Category",
        items: [
            {
                title: "All Category",
                url: "/admin/categories",
            },
        ],
    },
    {
        title: "User",
        items: [
            {
                title: "All Users",
                url: "/admin/users",
            }
        ],
    },
    {
        title: "Medicine",
        items: [
            {
                title: "All Medicines",
                url: "/admin/medicines",
            }
        ],
    },
]