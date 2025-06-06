/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowDown01, ArrowDownAZ, ArrowUpZA, Image } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";
import { Aminity } from "@/types/type";

import { Switch } from "@/components/ui/switch";

export const columns: ColumnDef<Aminity>[] = [
  {
    accessorKey: "no",
    header: () => (
      <div className="font-semibold">
        <ArrowDown01 className="size-4 text-muted-foreground" />
      </div>
    ),
  },
  {
    accessorKey: "icon",
    header: () => <div className="font-semibold">Icon</div>,
    cell: ({ row }) => {
      const icon = row.getValue("icon") as string;

      return <>{icon ? <img src={icon} alt="icon" className="size-8 rounded-full" /> : <Image className="size-5 text-muted-foreground" />}</>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors duration-200 w-fit" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <span className="font-semibold">Name</span>
          {column.getIsSorted() === "asc" ? (
            <ArrowDownAZ className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" />
          ) : (
            <ArrowUpZA className="h-4 w-4 opacity-50 hover:opacity-100 transition-opacity" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="font-semibold">Description</div>,
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      const maxLength = 50;

      const truncatedText = description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;

      return (
        <div className="truncate max-w-[200px] relative group cursor-help" title={description}>
          {truncatedText}
          <div className="absolute z-50 invisible group-hover:visible bg-black text-white text-sm rounded-md p-2 min-w-[200px] max-w-[300px] break-words shadow-lg -mt-1 left-0 transform translate-y-full">
            {description}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => <div className="font-semibold">Active</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;

      return <Switch checked={isActive} disabled className="cursor-not-allowed" />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction row={row} />,
  },
];
