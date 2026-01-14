import { Collection } from "@msw/data";
import z from "zod";
import { v4 as uuidv4 } from "uuid";

export const Zones = new Collection({
  schema: z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["delivery", "ride_share", "personal"]),
    location: z.object({
      lat: z.string(),
      long: z.string(),
    }),
    maxOccupancy: z.number(),
    violationCount: z.number(),
    vehicles: z.array(z.string()),
  }),
});

export const Vehicles = new Collection({
  schema: z.object({
    id: z.string(),
    zone: z.string(),
    type: z.enum(["delivery", "ride_share", "personal"]),
    arrivalTime: z.string(),
    timeLimit: z.number(),
    overstayed: z.boolean(),
  }),
});

export const Alerts = new Collection({
  schema: z.object({
    id: z.string(),
    zone: z.string(),
    vehicle: z.string(),
    severity: z.enum(["low", "medium", "high"]),
    timestamp: z.string(),
  }),
});

export const Activities = new Collection({
  schema: z.object({
    id: z.string(),
    actionTaken: z.enum(["visited", "warning", "ticketed"]),
    timestamp: z.string(),
    zoneId: z.string(),
    vehicleId: z.string(),
  }),
});

/**
 * Seed initial mock data
 */
export function seedMockData() {
  // Create zones
  const zone1Id = uuidv4();
  const zone2Id = uuidv4();
  const zone3Id = uuidv4();

  const vehicle1Id = uuidv4();
  const vehicle2Id = uuidv4();
  const vehicle3Id = uuidv4();
  const vehicle4Id = uuidv4();

  const now = new Date().toISOString();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  Zones.create({
    id: zone1Id,
    name: "Walnut Public Parking A",
    type: "personal",
    location: { lat: "39.950057", long: "-75.169593" },
    maxOccupancy: 2,
    violationCount: 2,
    vehicles: [vehicle1Id, vehicle2Id],
  });

  Zones.create({
    id: zone2Id,
    name: "Ride share pickup zone B",
    type: "ride_share",
    location: { lat: "39.951155", long: "-75.166403" },
    maxOccupancy: 3,
    violationCount: 0,
    vehicles: [vehicle3Id],
  });

  Zones.create({
    id: zone3Id,
    name: "Sansom business delivery zone A",
    type: "delivery",
    location: { lat: "39.950590", long: "-75.167991" },
    maxOccupancy: 1,
    violationCount: 1,
    vehicles: [vehicle4Id],
  });

  // Create vehicles
  Vehicles.create({
    id: vehicle1Id,
    zone: zone1Id,
    type: "delivery",
    arrivalTime: oneHourAgo,
    timeLimit: 30,
    overstayed: false,
  });

  Vehicles.create({
    id: vehicle2Id,
    zone: zone1Id,
    type: "ride_share",
    arrivalTime: now,
    timeLimit: 15,
    overstayed: false,
  });

  Vehicles.create({
    id: vehicle3Id,
    zone: zone2Id,
    type: "personal",
    arrivalTime: oneHourAgo,
    timeLimit: 120,
    overstayed: true,
  });

  // Create alerts
  Alerts.create({
    id: uuidv4(),
    zone: zone1Id,
    vehicle: vehicle1Id,
    severity: "high",
    timestamp: now,
  });

  Alerts.create({
    id: uuidv4(),
    zone: zone2Id,
    vehicle: vehicle3Id,
    severity: "low",
    timestamp: now,
  });

  // Create activities
  Activities.create({
    id: uuidv4(),
    actionTaken: "visited",
    timestamp: now,
    zoneId: zone1Id,
    vehicleId: vehicle1Id,
  });

  Activities.create({
    id: uuidv4(),
    actionTaken: "warning",
    timestamp: now,
    zoneId: zone2Id,
    vehicleId: vehicle3Id,
  });
}
