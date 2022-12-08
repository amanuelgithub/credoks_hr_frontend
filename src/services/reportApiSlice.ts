import { apiSlice } from "../app/api/apiSlice";
import { ITotalCompaniesStats } from "../models/ITotalCompaniesStats";
import { ITotalCompanyStats } from "../models/ITotalCompanyStats";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompaniesTotalStats: builder.query<ITotalCompaniesStats, void>({
      query: () => ({
        url: "/reports/companies-total-stats",
      }),
      keepUnusedDataFor: 10,
    }),

    getCompanyTotalStats: builder.query<ITotalCompanyStats, any>({
      query: (companyId: string) => ({
        url: `/reports/${companyId}/company-total-stats`,
      }),
      keepUnusedDataFor: 10,
    }),
  }),
});

export const { useGetCompaniesTotalStatsQuery, useGetCompanyTotalStatsQuery } =
  reportApiSlice;
