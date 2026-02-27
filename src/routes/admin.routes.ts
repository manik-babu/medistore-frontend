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
        title: "Inventory",
        items: [
            {
                title: "All Medicines",
                url: "/seller/medicines",
            },
            {
                title: "Add Medicines",
                url: "/seller/medicines/add",
            },
        ],
    },
]