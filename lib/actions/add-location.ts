"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function geocodeAddress(address: string) {
  const apiKey = process.env.LOCATIONIQ_API_KEY!;
  const response = await fetch(
    `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(address)}&format=json&limit=1`
  );

  if (!response.ok) {
    throw new Error("Unable to geocode address");
  }

  const data = await response.json();
  if (!data.length) throw new Error("Address not found");

  const { lat, lon } = data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
}

export async function addLocation(formData: FormData, tripId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: { id: true },
  });

  if (!trip) {
    throw new Error("Trip not found");
  }

  const address = formData.get("address")?.toString().trim();
  if (!address) {
    throw new Error("Missing address");
  }

  const { lat, lng } = await geocodeAddress(address);

  const count = await prisma.location.count({
    where: { tripId: trip.id },
  });

  await prisma.location.create({
    data: {
      locationTitle: address,
      lat,
      lng,
      tripId: trip.id,
      order: count,
    },
  });

  redirect(`/trips/${trip.id}`);
}
