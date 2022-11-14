import { apiSlice } from "../app/api/apiSlice";

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeavesInCompany: builder.query<any[], any>({
      query: (companyId: string) => ({ url: `/leaves/${companyId}` }),
      providesTags: [{ type: "Leave", id: "LIST" }],
      keepUnusedDataFor: 10,
    }),
  }),
});

export const { useGetLeavesInCompanyQuery } = leaveApiSlice;
