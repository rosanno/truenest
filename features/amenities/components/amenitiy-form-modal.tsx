import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import useAmenityDialog from "@/features/amenities/hooks/use-amenity-dialog";
import { useCreateAmenities } from "@/features/amenities/hooks/use-create-amenities";
import { useUpdateAmenities } from "@/features/amenities/hooks/use-update-amenities";

import ModalDialog from "@/components/modal-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  icon: z.string().optional(),
});

const AmenitiyFormModal = () => {
  const { mutateAsync: createAmenity, isPending: isCreated } = useCreateAmenities();
  const { mutateAsync: updateAmenity, isPending: isUpdating } = useUpdateAmenities();
  const { isOpen, onClose, data } = useAmenityDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      icon: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (data) {
        const payload = {
          ...values,
          id: data?.id,
        };

        const response = await updateAmenity(payload);
        console.log(response);
      } else {
        const response = await createAmenity(values);
        toast.success(response.msg);
      }
      form.reset({
        name: "",
        description: "",
        icon: "",
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong please try again.");
    }
  };

  const handleClose = () => {
    form.reset({
      name: "",
      description: "",
      icon: "",
    });
    onClose();
  };

  // Set form values when data is available
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
        icon: data.icon || "",
      });
    }
  }, [data, form]);

  return (
    <>
      {(isUpdating || isCreated) && <Loader />}
      <ModalDialog title={`${data ? "Update" : "Add"} Amenity`} description="Provide details to create a new amenity." isOpen={isOpen} onClose={handleClose}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amenity name" {...field} disabled={isCreated || isUpdating} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter amenity description" {...field} disabled={isCreated || isUpdating} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter icon name or URL" {...field} disabled={isCreated || isUpdating} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={handleClose} disabled={isCreated || isUpdating}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCreated || isUpdating}>
                {data ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </ModalDialog>
    </>
  );
};

export default AmenitiyFormModal;
