import { useGetZonesQuery } from "@/state/state";
import { ZoneObject } from "@/types/api";
import Link from "next/link";

const ZoneRow = ({
  id,
  name,
  vehicles,
  maxOccupancy,
  violationCount,
}: ZoneObject) => {
  const borderColor =
    violationCount > 0 ? "border-red-500" : "border-green-500";
  return (
    <div
      className={`flex justify-between items-center ${borderColor} border rounded-sm px-3 py-2`}
    >
      <div className="flex flex-col">
        <strong className="text-ellipsis whitespace-nowrap max-w-[200px] overflow-hidden">
          {name}
        </strong>
        <div className="flex gap-4">
          <p>
            Occupancy: {vehicles.length} / {maxOccupancy}
          </p>
          <p>Violations: {violationCount}</p>
        </div>
      </div>
      <Link
        className="cursor-pointer border rounded-xs p-2"
        href={`/zone/${id}`}
      >
        View Details
      </Link>
    </div>
  );
};

export const ZonesList = () => {
  const { data: zones, isError, isLoading } = useGetZonesQuery();

  if (isLoading) return <div>Loading zones...</div>;
  if (isError) return <div>Error loading zones</div>;
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Zones</h2>
      <div className="flex flex-col gap-2">
        {zones
          ?.slice()
          ?.sort((zoneA, zoneB) => zoneB.violationCount - zoneA.violationCount)
          .map((zone) => (
            <ZoneRow key={zone.id.toString()} {...zone} />
          ))}
      </div>
    </div>
  );
};
