import { apiSlice } from "../app/api/apiSlice";
import { IPayroll } from "../models/IPayroll";

export const payrollApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    processPayroll: builder.mutation({
      query: (payroll: IPayroll) => ({
        url: `/payroll/process-payroll`,
        method: "POST",
        body: payroll,
      }),
    }),
  }),
});

export const { useProcessPayrollMutation } = payrollApiSlice;
