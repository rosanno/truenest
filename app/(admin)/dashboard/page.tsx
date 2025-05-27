"use client";

import React from "react";

import DashboardTitle from "@/components/dashboard-title";
import PropertiesCard from "@/features/dashboard/components/properties-card";

const Page = () => {
  return (
    <div className="p-10">
      <DashboardTitle
        title="Dashboard"
        description="Welcome to admin panel"
        className="flex items-center justify-between"
      />
      <div>
        <div>
          <PropertiesCard />
        </div>
        <div>TODO: Add dashboard card content here</div>
      </div>
    </div>
  );
};

export default Page;
