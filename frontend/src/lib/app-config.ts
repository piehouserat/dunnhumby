import {
  HomeIcon,
  LifeBuoyIcon,
  ListIcon,
  PackageIcon,
  SendIcon,
  Settings2Icon,
  type LucideIcon,
} from "lucide-react";

export type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  navSecondary: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
};

export const sidebarData: SidebarData = {
  user: {
    name: "Martin Tomaszczyk",
    email: "martin.tomaszczyk@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Products",
      url: "/products",
      icon: PackageIcon,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: ListIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2Icon,
    },
  ],
  navSecondary: [
    // {
    //   title: "Support",
    //   url: "#",
    //   icon: LifeBuoyIcon,
    // },
    // {
    //   title: "Feedback",
    //   url: "#",
    //   icon: SendIcon,
    // },
  ],
};
