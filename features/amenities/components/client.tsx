"use client";

import React from "react";
import { toast } from "sonner";

import { useGetAminities } from "@/features/amenities/hooks/use-get-aminities";
import useAmenityDialog from "@/features/amenities/hooks/use-amenity-dialog";
import { useDeleteAmenity } from "@/features/amenities/hooks/use-delete-amenity";
import useAlert from "@/hooks/use-alert";

import { Card, CardContent } from "@/components/ui/card";
import AmenitiyFormModal from "./amenitiy-form-modal";
import { DataTable } from "@/components/data-table";
import AddButton from "@/components/add-button";
import { columns } from "./columns";
import AlertModal from "@/components/alert-modal";
import { Loader } from "@/components/loader";

const Client = () => {
  const { onOpen } = useAmenityDialog();
  const { isOpen, onClose, id } = useAlert();
  const { data: { aminities = [] } = {} } = useGetAminities();
  const { mutateAsync: deleteAmenity, isPending } = useDeleteAmenity();

  const onDelete = async () => {
    try {
      const response = await deleteAmenity(id);

      if (response.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      {isPending && <Loader />}
      <AlertModal isOpen={isOpen} onClose={onClose} title="Delete Amenity" description="Are you sure you want to delete this amenity? This action cannot be undone." onDelete={onDelete} />
      <AmenitiyFormModal />
      <Card className="custom-card">
        <CardContent>
          <AddButton label="Add Amenities" onClick={() => onOpen()} />
          <DataTable data={aminities} columns={columns} filterKey="name" />
        </CardContent>
      </Card>
    </>
  );
};

export default Client;
