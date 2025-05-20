"use client";

import * as React from "react";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const themes = [
  {
    value: "system",
    label: "System default",
    icon: MonitorIcon,
  },
  {
    value: "light",
    label: "Light",
    icon: SunIcon,
  },
  {
    value: "dark",
    label: "Dark",
    icon: MoonIcon,
  },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { theme: currentTheme, setTheme } = useTheme();
  const [selected, setSelected] = React.useState(currentTheme || "system");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleUpdate = () => {
    setTheme(selected);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dashboard theme</CardTitle>
        <CardDescription>
          This only applies to your logged in dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        {themes.map((t) => {
          const Icon = t.icon;
          const isSelected = selected === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => handleSelect(t.value)}
              className={`flex flex-col items-center justify-center px-8 py-6 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-ring/50 shadow-sm cursor-pointer bg-muted/30 hover:bg-muted/50 ${
                isSelected
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              }`}
              aria-pressed={isSelected}
            >
              <Icon className="w-12 h-12 mb-4" />
              <span className="text-base font-medium mt-2">{t.label}</span>
            </button>
          );
        })}
      </CardContent>
      <CardFooter className="border-t flex justify-end">
        <Button onClick={handleUpdate} disabled={selected === currentTheme}>
          Update
        </Button>
      </CardFooter>
    </Card>
  );
}
