import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { userService } from "@/services/user.service"
import { Route } from "@/types/route"
import { UserRole } from "@/constants/userRole"
import { adminRoutes } from "@/routes/admin.routes"
import { sellerRoute } from "@/routes/seller.routes"

// This is sample data.
// const data = {
//   navMain: [
//     {
//       title: "Dashboard",
//       items: [
//         {
//           title: "Overview",
//           url: "/seller/dashboard",
//         },
//       ],
//     },
//     {
//       title: "Orders",
//       items: [
//         {
//           title: "My Orders",
//           url: "/seller/orders",
//         },
//       ],
//     },
//     {
//       title: "Inventory",
//       items: [
//         {
//           title: "All Medicines",
//           url: "/seller/medicines",
//         },
//         {
//           title: "Add Medicines",
//           url: "/seller/medicines/add",
//           isActive: true,
//         },
//       ],
//     },
//   ],
// }

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = await userService.getSession();
  let routes: Route[] = [];
  if (session.role === UserRole.ADMIN) {
    routes = adminRoutes;
  }
  else {
    routes = sellerRoute;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes?.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <div className="font-medium">
                    {item.title}
                  </div>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={false}>
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
