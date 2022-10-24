import { apiSlice } from "../app/api/apiSlice";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<any[], void>({
      query: () => ({ url: "/companies" }),
      keepUnusedDataFor: 10,
    }),

    addCompany: builder.mutation({
      query: (company) => ({
        url: "/companies",
        method: "POST",
        body: company,
      }),
    }),
  }),
});

export const { useGetCompaniesQuery, useAddCompanyMutation } = companyApiSlice;
