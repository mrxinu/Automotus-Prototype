# MSW Mock API

This folder contains Mock Service Worker (MSW) setup for the Automotus API.

## Files

- **data.ts** – Defines the mock database schema using `@mswjs/data` with initial seed data
- **handlers.ts** – Defines all HTTP request handlers matching the API specification
- **server.ts** – MSW server setup for Node.js environments (testing, SSR)
- **browser.ts** – MSW worker setup for browser environments (development, client-side)

## Usage

### In Browser (Next.js App)

Add to your root layout or app initialization:

```typescript
import { worker } from "@/api/mocks/browser";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  worker.start();
}
```

### In Tests

```typescript
import { server } from "@/api/mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## API Endpoints

All endpoints are mounted at `/api`:

- `GET /api/zones` – List all zones (vehicles as IDs)
- `GET /api/zone/:zoneId` – Single zone with full vehicle objects
- `GET /api/vehicles/:zoneId` – Vehicles in a zone
- `GET /api/vehicle/:vehicleId` – Single vehicle
- `GET /api/alerts` – All alerts
- `GET /api/alert/:alertId` – Single alert
- `GET /api/activities` – User activities

## Adding More Data

Edit `data.ts` and add records to the `seedMockData()` function, or manipulate the `db` object directly in handlers.
