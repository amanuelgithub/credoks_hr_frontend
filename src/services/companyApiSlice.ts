import { apiSlice } from "../app/api/apiSlice";
import { ICompany } from "../models/ICompany";

export const companyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<any[], void>({
      query: () => ({ url: "/companies" }),
      providesTags: [{ type: "Company", id: "LIST" }],
    }),

    getCompany: builder.query({
      query: (id: string | undefined) => ({ url: `/companies/${id}` }),
      providesTags: [{ type: "Company", id: "LIST" }],
    }),

    addCompany: builder.mutation({
      query: (company: ICompany) => ({
        url: "/companies",
        method: "POST",
        body: company,
      }),
      invalidatesTags: [{ type: "Company", id: "LIST" }],
    }),

    updateCompany: builder.mutation({
      query: (company: ICompany) => ({
        url: `/companies/${company.id}`,
        method: "PATCH",
        body: company,
      }),
      invalidatesTags: [{ type: "Company", id: "LIST" }],
    }),

    deleteCompany: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/companies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Company", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useAddCompanyMutation,
  useGetCompanyQuery,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApiSlice;
