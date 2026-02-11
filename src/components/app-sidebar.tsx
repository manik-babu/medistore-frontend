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
import { Button } from "./ui/button"

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
              <Link href={'/shop'}>
                <Button className="text-2xl font-bold cursor-pointer" variant={"ghost"}>MediStore</Button>
              </Link>
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
