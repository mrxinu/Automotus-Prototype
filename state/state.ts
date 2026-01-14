import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ZoneObject, VehicleObject, AlertObject } from "@/types/api";
import { configureStore, createSelector, createSlice } from "@reduxjs/toolkit";

const baseQuery = () => {
  const result = fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" });
  return result;
};

export const automotusApi = createApi({
  reducerPath: "automotusApi",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getZones: builder.query<ZoneObject[], void>({
      query: () => `zones`,
    }),
    getZoneById: builder.query<ZoneObject, string>({
      query: (id) => `zone/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetZonesQuery, useGetZoneByIdQuery } = automotusApi;

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMounted: false,
  },
  reducers: {
    setMounted(state) {
      state.isMounted = true;
    },
  },
});

export const { setMounted } = appSlice.actions;

export const store = configureStore({
  reducer: {
    [automotusApi.reducerPath]: automotusApi.reducer,
    app: appSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(automotusApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const selectIsMounted = createSelector(
  (state: RootState) => state.app.isMounted,
  (isMounted) => isMounted
);
