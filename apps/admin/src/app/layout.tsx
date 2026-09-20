import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

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
      <body className="min-h-screen">
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />

            <div className="flex min-h-screen flex-1 flex-col ">
              {/* Header */}
              <header className="h-20 shrink-0 border-b bg-pink-500">
                <div className="flex h-full items-center px-6">
                  <SidebarTrigger />
                  <h1 className="mr-4 text-xl font-semibold">پنل مدیریت</h1>
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 p-6">{children}</main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
