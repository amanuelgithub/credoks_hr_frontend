import { apiSlice } from "../app/api/apiSlice";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any[], void>({
      query: () => ({ url: "/employees" }),
      keepUnusedDataFor: 10,
    }),
  }),
});

export const { useGetEmployeesQuery } = employeeApiSlice;
