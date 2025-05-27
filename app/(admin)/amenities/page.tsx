import React from "react";

import DashboardTitle from "@/components/dashboard-title";
import Client from "@/features/amenities/components/client";

export const metadata = {
  title: "Amenity List",
};

const Page = () => {
  return (
    <div className="p-10">
      <DashboardTitle title="Manage Aminities" description="Manage amenities such as WiFi, CCTV, parking, and more" className="flex justify-between" />
      <Client />
    </div>
  );
};

export default Page;
