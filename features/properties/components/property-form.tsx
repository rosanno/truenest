"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import { z } from "zod";

import { useGetAminities } from "@/features/amenities/hooks/use-get-aminities";
import { propertyFormSchema } from "@/features/properties/schema/property-form-schema";
import { useCreateProperty } from "@/features/properties/hooks/use-create-property";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PropertyForm = () => {
  const { data: { aminities = [] } = {} } = useGetAminities();
  const { mutateAsync } = useCreateProperty();

  const form = useForm({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: "",
      type: undefined,
      status: undefined,
      price: 0,
      rooms: 1,
      beds: 1,
      baths: 1,
      area: 0,
      description: "",
      photos: undefined,
      country: "",
      city: "",
      landmark: "",
      features: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof propertyFormSchema>) => {
    const response = await mutateAsync(values);

    console.log(response);
  };

  return (
    <Card className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/20 backdrop-blur-sm mt-6 px-2 py-8 hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl">Add property details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5">
              {/* Property Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter property name" {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Property Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1.5">
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full custom-input">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Property Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full space-y-1.5">
                    <FormLabel>Property Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full custom-input">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="₱1000000" {...field} className="custom-input" min={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rooms */}
              <FormField
                control={form.control}
                name="rooms"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Number of Rooms</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={6} {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Beds */}
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Number of Beds</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={6} {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Baths */}
              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Number of Baths</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={6} {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Area */}
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Area (sq ft)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter area" {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description - Full Width */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter property description" className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address and Zip Code - 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter property address" {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Zip Code */}
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter zip code" {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Country, City and Landmark - 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5">
              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter country" {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Landmark */}
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel>Landmark</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter landmark" {...field} className="custom-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Add this before the Submit button */}
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel>Property Images</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#F34451] transition-colors duration-300 cursor-pointer">
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="property-images"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          field.onChange(files);
                        }}
                      />
                      <label htmlFor="property-images" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-10 w-10 text-gray-400" />
                          <div className="text-gray-600">
                            <span className="font-semibold text-[#F34451]">Click to upload</span> or drag and drop
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                        </div>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amenities Section */}
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel>Amenities</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {aminities.map((amenity) => (
                        <label key={amenity._id} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={field.value?.includes(amenity._id ?? "")}
                            onChange={(e) => {
                              const updatedAmenities = e.target.checked ? [...(field.value || []), amenity._id] : field.value?.filter((id) => id !== amenity._id) || [];
                              field.onChange(updatedAmenities);
                            }}
                            className="form-checkbox h-4 w-4 text-[#F34451] rounded border-gray-300 focus:ring-[#F34451]"
                          />
                          <span className="text-sm text-gray-700">{amenity.name}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="px-0 flex items-center gap-x-3">
              <Button
                type="submit"
                className="rounded-full font-medium bg-gradient-to-r from-[#F34451] to-[#FF6B76] hover:from-[#FF6B76] hover:to-[#F34451] cursor-pointer hover:shadow-lg transition-all duration-300 text-white border-0 w-28"
                size="lg"
              >
                Submit
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="rounded-full border-dashed! cursor-pointer w-28 hover:bg-[#F34451]/20 hover:border-[#F34451] hover:text-[#F34451] transition-all duration-300"
              >
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
