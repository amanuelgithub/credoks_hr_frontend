import { apiSlice } from "../app/api/apiSlice";
import { ITotalStats } from "../models/ITotalStats";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTotalStats: builder.query<ITotalStats, void>({
      query: () => ({
        url: "/reports/total-status",
      }),
      keepUnusedDataFor: 10,
    }),
  }),

  //   getTotalStats: builder.query<ITotalStats, void>({
  //     query: () => ({ url: "/reports/total-status" }),
  //     keepUnusedDataFor: 10,
  //   }),
});

export const { useGetTotalStatsQuery } = reportApiSlice;
