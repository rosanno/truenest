/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import CustomCard from "@/components/custom-card";

const PropertiesCard = () => {
  return (
    <CustomCard className="max-w-lg">
      <div>
        <div className="flex justify-between">
          <div className="flex gap-x-5">
            <img
              src="assets/house-2.png"
              alt="Image"
              className="size-14"
            />
            <div>
              <h5 className="text-2xl font-semibold">45</h5>
              <span className="text-lg text-muted-foreground">
                Properties
              </span>
            </div>
          </div>
          <Link href="#" className="text-sm text-[#F34451]">
            <div className="flex items-center gap-x-1.5">
              See all properties{" "}
              <ChevronRight className="w-4" />
            </div>
          </Link>
        </div>
        <div>
          <Stats />
        </div>
      </div>
    </CustomCard>
  );
};

function Stats() {
  return <div className="bg-gray-100/60 rounded-md">Stats</div>;
}

export default PropertiesCard;
