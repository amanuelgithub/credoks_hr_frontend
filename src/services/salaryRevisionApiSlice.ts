import { apiSlice } from "../app/api/apiSlice";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { ISalaryRevision } from "../models/ISalaryRevision";

export const salaryRevisionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getSalaryRevisions: builder.query<any[], void>({
      query: () => ({ url: "/salary-revision" }),
      providesTags: [{ type: "SalaryRevision", id: "LIST" }],
    }),

    getEmployeeSalaryRevisions: builder.query<ISalaryRevision[], string>({
      query: (employeeId: string) => ({
        url: `/salary-revision/employee/${employeeId}`,
      }),
      providesTags: [{ type: "SalaryRevision", id: "LIST" }],
    }),

    getAllSalaryRevisionsOfCompany: builder.query<ISalaryRevision[], string>({
      query: (companyId: string) => ({
        url: `/salary-revision/company/${companyId}`,
      }),
      providesTags: [{ type: "SalaryRevision", id: "LIST" }],
    }),

    getAllPendingSalaryRevisionsOfCompany: builder.query<
      ISalaryRevision[],
      string
    >({
      query: (companyId: string) => ({
        url: `/salary-revision/company/${companyId}/pending`,
      }),
      providesTags: [{ type: "SalaryRevision", id: "LIST" }],
    }),

    // create a salary revision
    createSalaryRevision: builder.mutation({
      query: ({
        employeeId,
        salaryRevision,
      }: {
        employeeId: string;
        salaryRevision: ISalaryRevision;
      }) => ({
        url: `/salary-revision/make`,
        method: "POST",
        body: salaryRevision,
      }),
      invalidatesTags: [{ type: "SalaryRevision", id: "LIST" }],
    }),

    // update salary revision
    approveSalaryRevision: builder.mutation({
      query: ({
        salaryRevisionId,
        salaryRevision,
      }: {
        salaryRevisionId: string;
        salaryRevision: ISalaryRevision;
      }) => ({
        url: `/salary-revision/${salaryRevisionId}/approve`,
        method: "PATCH",
        body: salaryRevision,
      }),
      invalidatesTags: [{ type: "SalaryRevision", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSalaryRevisionsQuery,
  useGetAllPendingSalaryRevisionsOfCompanyQuery,
  useGetAllSalaryRevisionsOfCompanyQuery,
  useGetEmployeeSalaryRevisionsQuery,
  useCreateSalaryRevisionMutation,
  useApproveSalaryRevisionMutation,
} = salaryRevisionApiSlice;
