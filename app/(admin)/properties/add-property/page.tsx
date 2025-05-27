import React from "react";

import DashboardTitle from "@/components/dashboard-title";
import PropertyForm from "@/features/properties/components/property-form";

export const metadata = {
  title: "Add Property",
}

const Page = () => {
  return (
    <div className="p-10">
      <DashboardTitle title="Add Property" description="Manage and oversee all property listings" className="flex justify-between" />
      <PropertyForm />
    </div>
  );
};

export default Page;
