import { Breadcrumbs } from "./breadcrumbs";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface HeaderProps {
  actions?: React.ReactNode;
}

export function Header({ actions }: HeaderProps) {
  return (
    <header className="flex shrink-0 items-center gap-2 justify-between mb-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumbs />
      </div>
      {actions}
    </header>
  );
}
