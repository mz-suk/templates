"use client";
import { LayoutDashboard, ShoppingBag } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./navMain";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "대시보드",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "상품관리",
      url: "/products",
      icon: ShoppingBag,
      isActive: true,
      items: [
        {
          title: "상품 목록",
          url: "/products/test",
        },
        {
          title: "Manage Products",
          url: "/products/manage",
        },
        {
          title: "Settings",
          url: "/products/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex gap-x-6 items-center group-data-[collapsible=icon]:hidden">
          <div className="w-14 h-14 bg-primary-500 rounded-md" />
          <div className="text-gray-900 text-2xl font-bold">Dabang</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
