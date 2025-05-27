import React, { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CustomCard = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Card
      className={cn(
        "border-0 shadow-lg rounded-md",
        className
      )}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CustomCard;
