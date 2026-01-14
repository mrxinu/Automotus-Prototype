# Automotus Prototype

## Resources Used

- [Nextjs quick start](https://nextjs.org/docs/app/getting-started/installation)
  - Rapid app infrastructure build out including TW, ESLint, & TS
- [Redux Toolkit + Redux Toolkit Query](https://redux-toolkit.js.org/tutorials/quick-start)
  - Simplified API request & redux-based data storage
- [MSW](https://mswjs.io/)
  - Easy API mocking useful when rapidly prototyping or for testing
- (CodeSandbox from Round 2 Interview)[https://redux-toolkit.js.org/tutorials/quick-start]
  - Initial boilerplate/examples for Event & ZonePolicy types
- [Moment](https://momentjs.com/)
  - Library to ease the pain of working with Datetimes
- Github Copilot
  - For quickly generating useful code & boilerplate that can be further modified or adapted later
- [React Map GL](https://visgl.github.io/react-map-gl/)
  - Useful library for building map-based UIs

## Requirements / Background

- Parking enforcement officers need a way to improve their current workflow involving radio dispatch & paper lists to quickly identify parking violations and traveling to those violations
- Mobile-first companion app that will
  - Show PEOs the location of parking violations
  - Understand the violation circumstances (e.g. current vehicles, status)
  - Log PEO activity (e.g. visited zone, issued warning)
- Minimum viewport width: `375px`
-

## Metrics of Success

- Identify key MVP features (MoSCoW analysis)
- Implement Must Have MVP features, optionally Should Have
- Design mock API consumed by FE
- Handle real-world UX (e.g. API request states, edge cases)

## Data Concepts

- Zone
  - `id`
  - `name`
  - `location`
  - `current occupancy`
  - `max capacity`
  - `violation count`
- Vehicle
  - `id`
  - `zone`
  - `type`
  - `arrival time`
  - `time limit`
  - `overstay status`
- Alert
  - `id`
  - `zone`
  - `vehicle`
  - `severity`
  - `timestamp`
- Officer Activity
  - `actions taken`
  - `timestamps`

## Deliverables

- Github repo
  - Setup & Run Instructions
  - Tech Stack Choices & Rationale
  - API Documentation
  - Demo instructions (e.g. how to trigger error states)
- Runnable locally
- Written summary
  - 500-750 words
  - What was prioritized & why?
  - What was cut & why?
  - What assumptions were made about user needs?
  - How did I approach API design? What tradeoffs were made?
  - What would I build with another 2-3 hours?
