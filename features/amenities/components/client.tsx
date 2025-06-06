"use client";

import React from "react";
import { toast } from "sonner";

import useAmenityDialog from "@/features/amenities/hooks/use-amenity-dialog";
import { useGetAminities } from "@/features/amenities/hooks/use-get-aminities";
import { useDeleteAmenity } from "@/features/amenities/hooks/use-delete-amenity";
import useAlert from "@/hooks/use-alert";

import { Card, CardContent } from "@/components/ui/card";
import AmenitiyFormModal from "./amenitiy-form-modal";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import AddButton from "@/components/add-button";
import AlertModal from "@/components/alert-modal";
import { Loader } from "@/components/loader";
import SplashScreen from "@/components/splash-screen";

const Client = () => {
  const { onOpen } = useAmenityDialog();
  const { isOpen, onClose, id } = useAlert();
  const { data: { amenities } = {}, isLoading } = useGetAminities();
  const { mutateAsync: deleteAmenity, isPending: isDeleting } = useDeleteAmenity();

  const handleDelete = async () => {
    try {
      const response = await deleteAmenity(id);

      toast.success(response.msg);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong try again.");
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      {isDeleting && <Loader />}
      <AlertModal isOpen={isOpen} onClose={onClose} title="Delete Amenity" description="Are you sure you want to delete this amenity? This action cannot be undone." onDelete={handleDelete} />
      <AmenitiyFormModal />
      <Card className="custom-card">
        <CardContent>
          <AddButton label="Add Amenities" onClick={() => onOpen()} />
          <DataTable data={amenities || []} columns={columns} filterKey="name" />
        </CardContent>
      </Card>
    </>
  );
};

export default Client;
