"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const inactiveTextClass = "text-[#737791] font-bold text-[18px]";
  const activeTextClass = "bg-primary-500 text-white font-bold text-[18px]";

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((menu) => {
      initial[menu.url] = pathname.startsWith(menu.url);
    });
    return initial;
  });

  const toggleMenu = (href: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = openMenus[item.url];
          const hasChildren = item.items?.length;
          const isParentActive = hasChildren
            ? pathname.startsWith(item.url)
            : pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              {hasChildren ? (
                <Collapsible
                  open={isOpen}
                  onOpenChange={() => toggleMenu(item.url)}
                  className="group/collapsible w-full"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        "flex items-center justify-between w-full rounded-md transition cursor-pointer",
                        "h-[50px] px-4 py-2",
                        isParentActive ? activeTextClass : inactiveTextClass
                      )}
                    >
                      <div className="flex items-center gap-[24px]">
                        {item.icon && <item.icon className="w-6 h-6" />}
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight
                        className={cn(
                          "ml-auto transition-transform duration-300",
                          isOpen && "rotate-90"
                        )}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        // const isSubActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link
                                href={subItem.url}
                                className={cn(
                                  "block rounded-md transition text-sm cursor-pointer",
                                  "h-[50px] px-4 py-2 flex items-center"
                                )}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    "flex items-center w-full rounded-md transition cursor-pointer",
                    "h-[50px] px-4 py-2 gap-[24px]",
                    isParentActive ? activeTextClass : inactiveTextClass
                  )}
                >
                  <Link
                    href={item.url}
                    className="flex items-center gap-[24px] w-full"
                  >
                    {item.icon && <item.icon className="w-6 h-6" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
