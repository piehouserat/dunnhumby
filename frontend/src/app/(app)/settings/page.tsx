import { Header } from "@/components/header";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function SettingsPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto max-w-screen-md">
        <ThemeSwitcher />
      </div>
    </>
  );
}
