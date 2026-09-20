import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar side="right" className="h-full">
      <SidebarHeader>
        <div className="grid grid-cols-1 gap-2 text-center mt-2">
          <span>logo</span>
          <h1 className="text-3xl">نیک آدرین</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-amber-500 m-5 rounded-2xl">
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
