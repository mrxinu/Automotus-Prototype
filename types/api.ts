import { v4 } from "uuid";

type UUID = ReturnType<typeof v4>;
type Timestamp = string; // ISO 8601

type CoordinateString = `${number}.${number}`;

interface LocationObject {
  lat: CoordinateString;
  long: CoordinateString;
}

export interface ZoneObject {
  id: UUID;
  name: string;
  location: LocationObject;
  type: VehicleAndZoneType;
  maxOccupancy: number;
  violationCount: number;
  vehicles: UUID[];
}

type VehicleAndZoneType = "delivery" | "ride_share" | "personal";
export interface VehicleObject {
  id: UUID;
  zone: ZoneObject["id"];
  type: VehicleAndZoneType;
  arrivalTime: Timestamp;
  timeLimit: number; // in minutes
  overstayed: boolean; // true indicates vehicle has overstayed
}

export interface AlertObject {
  id: UUID;
  zone: ZoneObject["id"];
  vehicle: VehicleObject["id"];
  severity: "low" | "medium" | "high";
  timestamp: Timestamp;
}

export interface OfficerActivity {
  id: UUID;
  zone: ZoneObject["id"];
  vehicle: VehicleObject["id"];
  actionTaken: "visited" | "warning" | "ticketed";
  timestamp: Timestamp;
}
