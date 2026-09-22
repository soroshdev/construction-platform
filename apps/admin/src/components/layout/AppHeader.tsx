import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AppHeader = () => {
  return (
    <div>
      <header className="h-20 shrink-0 border-b">
        <div className="flex h-full items-center px-6">
          <div className="grid grid-cols-2 items-center gap-1">
            <SidebarTrigger />
            <ThemeToggle />
          </div>

          <h1 className="mr-4 text-xl font-semibold">پنل مدیریت</h1>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;
