"use client";

import React from "react";

import { useGetProperties } from "@/features/properties/hooks/use-get-properties";

import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import AddButton from "@/components/add-button";
import { columns } from "./columns";

const Client = () => {
  const { data: { properties = [] } = {} } = useGetProperties();

  return (
    <Card className="custom-card">
      <CardContent>
        <AddButton label="Add Property" href="properties/add-property" />
        <DataTable data={properties} columns={columns} filterKey="name" />
      </CardContent>
    </Card>
  );
};

export default Client;
