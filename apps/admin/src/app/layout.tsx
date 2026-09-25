import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar/AppSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import AppHeader from "@/components/layout/AppHeader";
import { QueryProvider } from "./query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: "%s | Admin Panel",
  },
  description: "Construction Company Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-screen w-screen overflow-hidden">
        <QueryProvider>
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
        </QueryProvider>
      </body>
    </html>
  );
}
