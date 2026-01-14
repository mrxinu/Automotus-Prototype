## Getting Started Locally

- Install dependencies via `yarn install`, `npm install`, or `pnpm install`
- Run dev server via `yarn dev`, `npm run dev`, or `pnpm dev`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## API Request States

- The app has baked in loading delays to demonstrate app-level and request level delays.
  - App-level delays are a random duration between 1-2s
  - Request delays for fetching a single zone are 1.5s for error response and 3s for success
- To see an error state, navigate to `/zone/{some-invalid-uud}` or click the **View Details** button on a row on the Zones page and manually refresh the page
