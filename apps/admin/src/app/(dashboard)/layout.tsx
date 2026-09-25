import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar/AppSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import AppHeader from "@/components/layout/AppHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div dir="rtl" className="h-screen w-screen overflow-hidden">
      <ThemeProvider>
        <TooltipProvider>
          <SidebarProvider className="h-full">
            <AppSidebar />

            <div className="flex h-full flex-1 flex-col overflow-hidden">
              {/* Header */}
              <AppHeader />

              {/* Content */}
              <main className="flex-1 overflow-y-auto p-5 no-scrollbar">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </ThemeProvider>
    </div>
  );
}
