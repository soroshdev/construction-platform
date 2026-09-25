import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileIcon } from "@/modules/profile/ProfileIcon";

const AppHeader = () => {
  return (
    <div>
      <header className="py-6 rounded-xl shrink-0 border-b bg-sidebar m-2">
        <div className="flex justify-between">
          <div className="flex h-full items-center px-6">
            <div className="grid grid-cols-2 items-center gap-1">
              <SidebarTrigger />
              <ThemeToggle />
            </div>
            <h1 className="mr-4 text-xl font-semibold">پنل مدیریت</h1>
          </div>
          <div className="mx-5">
            <ProfileIcon />
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;
