"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const segmentMap = {
  settings: "Settings",
  products: "Products",
  categories: "Categories",
  orders: "Orders",
  customers: "Customers",
};

const getSegmentName = (segment: string) => {
  return segmentMap[segment as keyof typeof segmentMap] || segment;
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.length > 0 && <BreadcrumbSeparator />}
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const isActive = pathname === path;

          return (
            <BreadcrumbItem key={segment}>
              {isActive ? (
                <BreadcrumbPage>{getSegmentName(segment)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={path}>
                  {getSegmentName(segment)}
                </BreadcrumbLink>
              )}
              {index < segments.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
