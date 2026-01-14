import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { seedMockData } from "./data";

/**
 * MSW server for Node.js environments (e.g., testing, SSR)
 */
export const server = setupServer(...handlers);

// Seed mock data before starting the server
seedMockData();
