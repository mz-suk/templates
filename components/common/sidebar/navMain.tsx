'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, type LucideIcon } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const inactiveTextClass = 'text-[#737791] font-bold text-[18px]';
  const activeTextClass = 'bg-primary-500 text-white font-bold text-[18px]';

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((menu) => {
      initial[menu.url] = pathname.startsWith(menu.url);
      menu.items?.forEach((subMenu) => {
        initial[subMenu.url] = pathname.startsWith(subMenu.url);
      });
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
          const isParentActive = hasChildren ? pathname.startsWith(item.url) : pathname === item.url;

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
                        'flex w-full cursor-pointer items-center justify-between rounded-md transition',
                        'h-[50px] px-4 py-2',
                        isParentActive ? activeTextClass : inactiveTextClass
                      )}
                    >
                      <div className="flex items-center gap-[24px]">
                        {item.icon && <item.icon className="h-6 w-6" />}
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight
                        className={cn('ml-auto transition-transform duration-300', isOpen && 'rotate-90')}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubOpen = openMenus[subItem.url];
                        const hasSubChildren = subItem.items?.length;
                        const isSubActive = hasSubChildren
                          ? pathname.startsWith(subItem.url)
                          : pathname === subItem.url;

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            {hasSubChildren ? (
                              <Collapsible
                                open={isSubOpen}
                                onOpenChange={() => toggleMenu(subItem.url)}
                                className="w-full"
                              >
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuSubButton
                                    className={cn(
                                      'flex w-full cursor-pointer items-center justify-between rounded-md text-sm transition',
                                      'h-[50px] px-4 py-2'
                                    )}
                                  >
                                    <span>{subItem.title}</span>
                                    <ChevronRight
                                      className={cn(
                                        'ml-auto h-4 w-4 transition-transform duration-300',
                                        isSubOpen && 'rotate-90'
                                      )}
                                    />
                                  </SidebarMenuSubButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pl-4">
                                  {subItem.items?.map((thirdItem) => (
                                    <Link
                                      key={thirdItem.title}
                                      href={thirdItem.url}
                                      className={cn(
                                        'block cursor-pointer rounded-md text-sm transition',
                                        'flex h-[40px] items-center px-4 py-2',
                                        'hover:bg-gray-100'
                                      )}
                                    >
                                      <span>{thirdItem.title}</span>
                                    </Link>
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            ) : (
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={subItem.url}
                                  className={cn(
                                    'block cursor-pointer rounded-md text-sm transition',
                                    'flex h-[50px] items-center px-4 py-2'
                                  )}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            )}
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
                    'flex w-full cursor-pointer items-center rounded-md transition',
                    'h-[50px] gap-[24px] px-4 py-2',
                    isParentActive ? activeTextClass : inactiveTextClass
                  )}
                >
                  <Link href={item.url} className="flex w-full items-center gap-[24px]">
                    {item.icon && <item.icon className="h-6 w-6" />}
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
