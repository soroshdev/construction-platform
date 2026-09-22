import * as React from "react";
import { ChevronDown } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { sidebaerMenu } from "@/components/layout/Sidebar/sidebar.data";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarHeader className="p-3 border-b items-center">
        <span>LOGO</span>
        <h2 className="text-lg font-bold">نیک آدرین</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-3 mt-2">
          {/* <SidebarGroupLabel>منوی اصلی</SidebarGroupLabel> */}
          <SidebarMenu>
            {sidebaerMenu.map((item, index) => {
              const Icon = item.icon;

              if (item.children && item.children.length > 0) {
                return (
                  <Collapsible key={index} className="group/collapsible mb-3">
                    <SidebarMenuItem>
                      <CollapsibleTrigger className="w-full">
                        <SidebarMenuButton className="w-full justify-between ">
                          <div className="flex w-full items-center gap-2">
                            {Icon && <Icon className="h-5! w-5!" />}
                            <span className="text-xl">{item.label}</span>
                          </div>
                          <ChevronDown className="h-4! w-4! transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="mr-4 ml-0 border-r border-l-0 pr-2 pl-0">
                          {item.children.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={subIndex}>
                              <SidebarMenuSubButton>
                                <Link href={subItem.url}>
                                  <span>{subItem.label}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={index} className="mb-3">
                  <SidebarMenuButton>
                    <Link
                      href={item.url || "#"}
                      className="flex items-center gap-2"
                    >
                      {Icon && <Icon className="h-5! w-5!" />}
                      <span className="text-xl">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
