import prisma from "@/lib/prisma";

export function getAmenityById(id: string) {
  return prisma.amenity.findUnique({ where: { id } });
}

export function updateAmenity(id: string, data: { name: string; description: string; icon?: string }) {
  return prisma.amenity.update({ where: { id }, data });
}

export function deleteAmenity(id: string) {
  return prisma.amenity.delete({ where: { id } });
}