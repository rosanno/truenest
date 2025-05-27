import React from "react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";

import useAmenityDialog from "@/features/amenities/hooks/use-amenity-dialog";
import useAlert from "@/hooks/use-alert";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Aminity } from "./columns";

const CellAction = ({ row }: { row: Row<Aminity> }) => {
  const { onOpen } = useAmenityDialog();
  const { onOpen: alertOpen } = useAlert();

  const open = (id: string) => {
    setTimeout(() => {
      alertOpen(id);
    }, 0); // Let browser update focus stack first
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={(e) => {
            (e.currentTarget as HTMLElement).blur();
            requestAnimationFrame(() => onOpen(row.original));
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => open(row.original._id!)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
