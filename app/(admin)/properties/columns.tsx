"use client";

import { PropertyForm } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PropertyForm>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];
