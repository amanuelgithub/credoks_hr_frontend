import { apiSlice } from "../app/api/apiSlice";
import { IPayroll } from "../models/IPayroll";

export const payrollApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllPayrolls: builder.query<any[], void>({
      query: () => ({ url: "/payroll" }),
      providesTags: [{ type: "Payroll", id: "LIST" }],
    }),

    processPayroll: builder.mutation({
      query: (payroll: IPayroll) => ({
        url: `/payroll/process-payroll`,
        method: "POST",
        body: payroll,
      }),
      invalidatesTags: [{ type: "Payroll", id: "LIST" }],
    }),
  }),
});

export const { useFindAllPayrollsQuery, useProcessPayrollMutation } =
  payrollApiSlice;
