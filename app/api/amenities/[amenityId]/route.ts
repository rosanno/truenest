import { NextResponse } from "next/server";
import { z } from "zod";

import { getAmenityById, updateAmenity, deleteAmenity } from "@/lib/amenity-service";

const AmenitySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ amenityId: string }> }) {
  try {
    const { amenityId } = await params;

    const json = await req.json();
    const result = AmenitySchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ message: "Invalid input", errors: result.error.errors }, { status: 400 });
    }

    const amenity = await getAmenityById(amenityId);
    if (!amenity) {
      return NextResponse.json({ message: "Amenity not found" }, { status: 404 });
    }

    const updated = await updateAmenity(amenityId, result.data);
    return NextResponse.json({ message: "Amenity updated", amenity: updated });
  } catch (error) {
    console.error("[PATCH_AMENITY]", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ amenityId: string }> }) {
  try {
    const { amenityId } = await params;

    const amenity = await getAmenityById(amenityId);
    if (!amenity) {
      return NextResponse.json({ message: "Amenity not found" }, { status: 404 });
    }

    await deleteAmenity(amenityId);
    return NextResponse.json({ msg: "Amenity deleted" });
  } catch (error) {
    console.error("[DELETE_AMENITY]", error);
    return NextResponse.json({ msg: "Internal server error" }, { status: 500 });
  }
}
