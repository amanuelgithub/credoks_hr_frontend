import { apiSlice } from "../app/api/apiSlice";
import { ICompanyNewEmpReport } from "../models/ICompanyNewEmpReport";
import { ITotalCompaniesStats } from "../models/ITotalCompaniesStats";
import { ITotalCompanyStats } from "../models/ITotalCompanyStats";

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompaniesTotalStats: builder.query<ITotalCompaniesStats, void>({
      query: () => ({
        url: "/reports/companies-total-stats",
      }),
      keepUnusedDataFor: 5,
    }),

    getCompanyTotalStats: builder.query<ITotalCompanyStats, any>({
      query: (companyId: string) => ({
        url: `/reports/${companyId}/company-total-stats`,
      }),
      keepUnusedDataFor: 5,
    }),

    getCompaniesNewEmployeesReport: builder.query<ICompanyNewEmpReport[], any>({
      query: (year: number) => ({
        url: `/reports/companies-new-employees-report/${year}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCompaniesTotalStatsQuery,
  useGetCompanyTotalStatsQuery,
  useGetCompaniesNewEmployeesReportQuery,
} = reportApiSlice;
