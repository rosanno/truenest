"use client";

import { ArrowDownAZ, ArrowUpZA } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cell-action";
import { Aminity } from "@/types/type";

export const columns: ColumnDef<Aminity>[] = [
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
    accessorKey: "icon",
    header: () => <div className="font-semibold">Icon</div>,
  },
  {
    accessorKey: "isActive",
    header: () => <div className="font-semibold">Active</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction row={row} />,
  },
];

