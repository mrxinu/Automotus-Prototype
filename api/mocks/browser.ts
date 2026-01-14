import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { seedMockData } from "./data";

/**
 * MSW worker for browser environments (e.g., development, client-side testing)
 * Usage: Add this to your app initialization before making API calls
 */
export const worker = setupWorker(...handlers);

// Seed mock data before starting the worker
seedMockData();
