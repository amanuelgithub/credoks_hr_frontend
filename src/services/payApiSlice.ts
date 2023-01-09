import { apiSlice } from "../app/api/apiSlice";
import { IPay } from "../models/IPay";

export const payApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllPayByPayrollId: builder.query<IPay[], any>({
      query: (payrollId: string) => ({ url: `/pay/${payrollId}` }),
    }),

    // used for payslip generator page
    findPayByPayId: builder.query<any, any>({
      query: (payId: string) => ({ url: `/pay/${payId}/payslip` }),
    }),
  }),
});

export const { useFindPayByPayIdQuery, useFindAllPayByPayrollIdQuery } =
  payApiSlice;
