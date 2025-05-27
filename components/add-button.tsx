"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

interface AddButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

const AddButton = ({ href, label, onClick }: AddButtonProps) => {

  return (
    <div className="flex justify-end items-center">
      <Link onClick={onClick ? onClick : undefined} href={`${href ? "properties/add-property" : "#"}`} className="flex items-center gap-2 bg-[#F34451] text-white px-4 py-2 rounded-md hover:bg-[#F34451]/90 transition-colors text-[14px] font-medium">
        <Plus className="h-4 w-4" /> {label}
      </Link>
    </div>
  );
};

export default AddButton;
