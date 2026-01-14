"use client";

import { useGetZoneByIdQuery } from "@/state/state";
import { useParams, useRouter } from "next/navigation";

export default function Zone() {
  const router = useRouter();
  const { zoneId } = useParams<{ zoneId: string }>();
  const {
    data: zone,
    isLoading,
    isError,
  } = useGetZoneByIdQuery(zoneId, {
    skip: !zoneId,
  });
  if (isLoading) return <div>Loading zone...</div>;
  if (isError) return <div>Error loading zone</div>;

  const zoneHasViolations = zone?.violationCount && zone.violationCount > 0;
  return (
    <main className="flex flex-col gap-4 min-h-screen justify-start bg-zinc-50 font-sans dark:bg-black min-w-sm max-w-md mx-auto py-12 px-5">
      <button
        className="cursor-pointer border rounded-xs p-2 self-start"
        onClick={router.back}
      >
        Back
      </button>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
        Automotus Prototype Zone - {zone?.name}
      </h1>
      <div className="flex flex-col divide-y divide-zinc-300 dark:divide-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-md px-4 py-2 bg-white dark:bg-zinc-900 shadow-md">
        <div className="flex justify-between py-1">
          <p className="font-bold">Type:</p>
          <p className="capitalize">{zone?.type.split("_").join(" ")}</p>
        </div>
        <div className="flex justify-between py-1">
          <p className="font-bold">Location:</p>
          <p className="capitalize">
            {zone?.location.lat} / {zone?.location.long}
          </p>
        </div>
        <div className="flex justify-between py-1">
          <p className="font-bold">Occupancy:</p>
          <p className="capitalize">
            {zone?.vehicles.length} / {zone?.maxOccupancy}
          </p>
        </div>
        <div
          className={`flex justify-between py-1 ${
            zoneHasViolations ? "text-red-500" : ""
          }`}
        >
          <p className="font-bold">Violations:</p>
          <p className="capitalize">{zone?.violationCount}</p>
        </div>
      </div>
    </main>
  );
}
