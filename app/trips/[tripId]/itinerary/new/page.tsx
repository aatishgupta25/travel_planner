import { auth } from "@/auth";
import NewLocationClient from "@/components/new-location";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function NewLocation({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Please sign in.</div>;
  }

  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    select: { id: true },
  });

  if (!trip) {
    notFound();
  }

  return <NewLocationClient tripId={trip.id} />;
}
