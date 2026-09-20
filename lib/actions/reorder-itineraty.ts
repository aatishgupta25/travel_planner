"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";

export async function reorderItinerary(tripId: string, newOrder: string[]) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const uniqueLocationIds = [...new Set(newOrder)];
  if (uniqueLocationIds.length !== newOrder.length) {
    throw new Error("Invalid itinerary order");
  }

  const [trip, ownedLocations] = await Promise.all([
    prisma.trip.findFirst({
      where: { id: tripId, userId },
      select: { id: true },
    }),
    prisma.location.findMany({
      where: {
        id: { in: uniqueLocationIds },
        tripId,
        trip: { userId },
      },
      select: { id: true },
    }),
  ]);

  if (!trip || ownedLocations.length !== uniqueLocationIds.length) {
    throw new Error("Trip or location not found");
  }

  const tripLocationCount = await prisma.location.count({
    where: { tripId: trip.id },
  });

  if (tripLocationCount !== uniqueLocationIds.length) {
    throw new Error("Itinerary order is incomplete");
  }

  await prisma.$transaction(
    newOrder.map((locationId: string, index: number) =>
      prisma.location.update({
        where: { id: locationId },
        data: { order: index },
      })
    )
  );
}
