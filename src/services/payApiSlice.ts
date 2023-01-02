import { apiSlice } from "../app/api/apiSlice";

export const payApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findAllPayByPayrollId: builder.query({
      query: (payrollId: string) => ({ url: `/pay/${payrollId}` }),
    }),
  }),
});

export const { useFindAllPayByPayrollIdQuery } = payApiSlice;
