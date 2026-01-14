import { delay, http, HttpResponse } from "msw";
import { Zones, Vehicles, Alerts, Activities } from "./data";

const baseUrl = (path: string) => `http://localhost:3000/api/v1${path}`;

export const handlers = [
  // GET /api/zones - List all zones with vehicle IDs only
  http.get(baseUrl("/zones"), () => {
    const zones = Zones.all().map((zone) => ({
      ...zone,
      vehicles: zone.vehicles, // Already IDs, as per spec
    }));
    return HttpResponse.json(zones);
  }),

  // GET /api/zone/:zoneId - Single zone with complete vehicle objects
  http.get(baseUrl("/zone/:zoneId"), async ({ params }) => {
    const zone = Zones.findFirst((q) =>
      q.where({ id: (id) => id === params.zoneId })
    );
    if (!zone) {
      await delay(1500);
      return HttpResponse.json({ error: "Zone not found" }, { status: 404 });
    }
    // Fetch complete vehicle objects
    const vehicleObjects = zone.vehicles.map((vehicleId) =>
      Vehicles.findFirst((q) => q.where({ id: (id) => id === vehicleId }))
    );
    await delay(3000);
    return HttpResponse.json({
      ...zone,
      vehicles: vehicleObjects,
    });
  }),

  // GET /api/vehicles/:zoneId - List vehicles in a zone
  http.get(baseUrl("/vehicles/:zoneId"), ({ params }) => {
    const vehicles = Vehicles.findMany((q) =>
      q.where({ id: (id) => id === params.zoneId })
    );
    return HttpResponse.json(vehicles);
  }),

  // GET /api/vehicle/:vehicleId - Single vehicle
  http.get(baseUrl("/vehicle/:vehicleId"), ({ params }) => {
    const vehicle = Vehicles.findFirst((q) =>
      q.where({ id: (id) => id === params.vehicleId })
    );
    if (!vehicle) {
      return HttpResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    return HttpResponse.json(vehicle);
  }),

  // GET /api/alerts - List all alerts
  http.get(baseUrl("/alerts"), () => {
    const alerts = Alerts.all();
    return HttpResponse.json(alerts);
  }),

  // GET /api/alert/:alertId - Single alert
  http.get(baseUrl("/alert/:alertId"), ({ params }) => {
    const alert = Alerts.findFirst((q) =>
      q.where({ id: (id) => id === params.alertId })
    );
    if (!alert) {
      return HttpResponse.json({ error: "Alert not found" }, { status: 404 });
    }
    return HttpResponse.json(alert);
  }),

  // GET /api/activities - List activities for authenticated user
  http.get(baseUrl("/activities"), () => {
    const activities = Activities.all();
    return HttpResponse.json(activities);
  }),
];
