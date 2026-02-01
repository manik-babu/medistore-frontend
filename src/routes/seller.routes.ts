import { Route } from "@/types/route";

export const sellerRoute: Route[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/seller/dashboard",
            },
        ],
    },
    {
        title: "Orders",
        items: [
            {
                title: "My Orders",
                url: "/seller/orders",
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