import React from "react";

import DashboardTitle from "@/components/dashboard-title";
import Client from "./client";

export const metadata = {
  title: "Property List",
};

const Page = () => {
  return (
    <div className="p-10">
      <DashboardTitle title="Property List" description="Manage and oversee all property listings" className="flex justify-between" />
      <Client />
    </div>
  );
};

export default Page;
