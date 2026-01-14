## Data Concepts

- Zone
  - `id` - UUID (string)
  - `name` - string
  - `location` - object with lat/long
  - `current occupancy` - number
  - `max capacity` - number
  - `violation count` - number
  - `vehicles` - UUID[] or Vehicle[]
- Vehicle
  - `id` - UUID (string)
  - `zone` - UUID (string) or Zone
  - `type` - "delivery" | "ride_share" | "personal"
  - `arrival time` - datetime
  - `time limit` - number (minutes)
  - `overstay status` - boolean (true if overstayed)
- Alert
  - `id` - UUID (string)
  - `zone` - UUID (string) or Zone
  - `vehicle` - UUID (string) or Vehicle
  - `severity` - "high" | "medium" | "low"
  - `timestamp` - datetime
- Officer Activity
  - `id` - UUID (string)
  - `actions taken` - "visited" | "warning" | "citation"
  - `timestamp` - datetime

## API Design

- GET
  - `zones` - list of all zones
    - `vehicles` returned are just IDs
  - `zone/{zone_id}` - data for single zone
    - `vehicles` returned are complete data objects
  - `vehicles/{zone_id}` - list of all vehicles in a zone
    - `zone` on each vehicle is just ID for zone vehicle is in
  - `vehicle/{vehicle_id}` - data for single vehicle
    - `zone` is just ID of zone vehicle is in
  - `alerts` - list of all alerts
    - `zone` & `vehicle` fields are just IDs of each
  - `alert/{alert_id}` - data for single alert
  - `activities` - list of all activities for authenticated user

NOTE - API would be expected to return data based on the authenticated user, e.g. when fetching zones, only the zones the user is assigned to would be returned
