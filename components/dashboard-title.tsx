"use client"

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { IoHome } from "react-icons/io5";

import { cn } from "@/lib/utils";

interface DashboardTitleProps {
  title: string;
  description?: string;
  className?: string;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({
  title,
  description,
  className,
}) => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-sm tracking-wide">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/" className="bg-[#F34451]/10 rounded-full h-6 w-7 flex items-center justify-center">
          <IoHome className="text-[#F34451] size-4" />
        </Link>
        {pathnames.map((value, index) => {
          const href =
            "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const formatted = decodeURIComponent(
            value
          ).replace(/-/g, " ");

          return (
            <div
              className="flex items-center space-x-2"
              key={href}
            >
              <ChevronRight size={16} />
              {isLast ? (
                <span className="text-gray-800 text-sm tracking-wide font-medium capitalize">
                  {formatted}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:underline capitalize"
                >
                  {formatted}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTitle;
