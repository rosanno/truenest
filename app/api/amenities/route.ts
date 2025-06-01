import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const amenitySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export async function GET(): Promise<Response> {
  const sessions = await auth();

  if (!sessions?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await prisma.amenity.findMany();

    if (result.length === 0) {
      return NextResponse.json({ msg: "No amenities found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Amenities found", amenities: result }, { status: 200 });
  } catch (error) {
    console.error("[AMENITY_GET]", error);

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sessions = await auth();

  if (!sessions?.user) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = amenitySchema.parse(body);

    const result = await prisma.amenity.create({
      data,
    });

    return NextResponse.json({ msg: "Amenity added", amenity: result }, { status: 201 });
  } catch (error) {
    console.error("[AMENITY_POST]", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ msg: "Invalid input", errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
