# Automotus Prototype

A mobile-first parking enforcement companion app for Parking Enforcement Officers (PEOs) to streamline violation detection and management workflows.

## Requirements / Background

- Parking enforcement officers need a way to improve their current workflow involving radio dispatch & paper lists to quickly identify parking violations and traveling to those violations
- Mobile-first companion app that will
  - Show PEOs the location of parking violations
  - Understand the violation circumstances (e.g. current vehicles, status)
  - Log PEO activity (e.g. visited zone, issued warning)
- Minimum viewport width: `375px`

## Quick Start

### Running with Docker (Recommended)

**Production mode:**
```bash
# Build and run the production container
docker-compose up app

# Or use docker directly
docker build -t automotus-prototype .
docker run -p 3000:3000 automotus-prototype
```

**Development mode with hot reloading:**
```bash
# Build and run the development container
docker-compose up dev
```

The application will be available at `http://localhost:3000`

### Running Locally (Without Docker)

**Prerequisites:**
- Node.js 20+
- pnpm (install with `corepack enable && corepack prepare pnpm@latest --activate`)

**Install and run:**
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS 4
- **API Mocking:** MSW (Mock Service Worker)
- **Package Manager:** pnpm
-

## Metrics of Success

- Identify key MVP features (MoSCoW analysis)
- Implement Must Have MVP features, optionally Should Have
- Design mock API consumed by FE
- Handle real-world UX (e.g. API request states, edge cases)

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
