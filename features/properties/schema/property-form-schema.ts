import { z } from "zod";

export const propertyFormSchema = z.object({
  name: z.string().min(5, {
    message: "Property name must be at least 5 characters long",
  }),
  type: z.enum(["apartment", "house", "condo", "land", "commercial"], {
    errorMap: () => ({
      message: "Please select a valid property type: apartment, house, condo, land, or commercial",
    }),
  }),
  status: z.enum(["For Rent", "For Sale"], {
    errorMap: () => ({
      message: 'Please select either "For Rent" or "For Sale" as the property status',
    }),
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be a positive number",
  }),
  rooms: z.coerce
    .number()
    .min(1, {
      message: "There must be at least 1 room",
    })
    .max(6, {
      message: "Number of rooms cannot exceed 6",
    }),
  beds: z.coerce
    .number()
    .min(1, {
      message: "There must be at least 1 bed",
    })
    .max(6, {
      message: "Number of beds cannot exceed 6",
    }),
  baths: z.coerce
    .number()
    .min(1, {
      message: "There must be at least 1 bath",
    })
    .max(6, {
      message: "Number of baths cannot exceed 6",
    }),
  area: z.coerce
    .number()
    .min(100, {
      message: "Area must be at least 100 sq ft",
    })
    .max(10000, {
      message: "Area cannot exceed 10,000 sq ft",
    }),
  description: z.string().min(500, {
    message: "Description must be at least 500 characters long",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters long",
  }),
  zipCode: z.string().min(4, {
    message: "Zip Code must be at least 4 characters",
  }),
  country: z
    .string()
    .min(2, {
      message: "Country name must be at least 2 characters",
    })
    .max(20, {
      message: "Country name must be less than 20 characters",
    }),
  city: z
    .string()
    .min(2, {
      message: "City name must be at least 2 characters",
    })
    .max(20, {
      message: "City name must be less than 20 characters",
    }),
  landmark: z
    .string()
    .min(2, {
      message: "Landmark must be at least 2 characters",
    })
    .max(20, {
      message: "Landmark must be less than 20 characters",
    }),
  photos: z
    .array(
      z.object({
        url: z.string(),
      }),
    )
    .optional(),
  features: z.array(z.string()),
});
