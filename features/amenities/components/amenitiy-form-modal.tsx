/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import useAmenityDialog from "@/features/amenities/hooks/use-amenity-dialog";
import { useCreateAmenities } from "@/features/amenities/hooks/use-create-amenities";
import { useUpdateAmenities } from "@/features/amenities/hooks/use-update-amenities";

import ModalDialog from "@/components/modal-dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { Switch } from "@/components/ui/switch";
import { UploadDropzone } from "@/utils/uploadthing";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  icon: z.string().optional(),
  isActive: z.boolean().optional(),
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
                    <div>
                      {field.value && (
                        <div className="mb-4">
                          <img src={field.value} alt="Uploaded icon preview" className="w-10 h-10 object-cover rounded-lg" />
                        </div>
                      )}
                      <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]) {
                            field.onChange(res[0].ufsUrl);
                          }
                        }}
                        onUploadError={(error: Error) => {
                          toast.error(`Upload failed: ${error.message}`);
                        }}
                        onUploadProgress={(progress: number) => {
                          toast.info(`Uploading: ${Math.round(progress)}%`, {
                            id: "upload-progress",
                          });
                        }}
                        config={{
                          mode: "auto",
                        }}
                        appearance={{
                          container: "w-full",
                          button: "ut-uploading:bg-muted-foreground ut-uploading:cursor-not-allowed",
                          allowedContent: "text-xs text-muted-foreground",
                          uploadIcon: "ut-uploading:opacity-50",
                        }}
                        disabled={isCreated || isUpdating}
                      />
                      <p className="text-sm text-muted-foreground mt-1">Upload an icon image (PNG, JPG up to 1MB)</p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Set whether this amenity is active or inactive</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isCreated || isUpdating} aria-readonly />
                  </FormControl>
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
