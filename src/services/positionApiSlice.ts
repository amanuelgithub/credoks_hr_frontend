import { apiSlice } from "../app/api/apiSlice";
import { IPosition } from "../models/IPosition";

export const positionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<any[], void>({
      query: () => ({ url: "/positions" }),
      providesTags: [{ type: "Position", id: "LIST" }],
    }),

    getPositionsOfCompany: builder.query<any[], any>({
      query: (companyId: string) => ({
        url: `/positions/company/${companyId}`,
      }),
      providesTags: [{ type: "Position", id: "LIST" }],
    }),

    getPosition: builder.query({
      query: (id: string | undefined) => ({ url: `/positions/${id}` }),
      providesTags: [{ type: "Position", id: "LIST" }],
    }),

    addPosition: builder.mutation({
      query: (position: IPosition) => ({
        url: "/positions",
        method: "POST",
        body: position,
      }),
      invalidatesTags: [{ type: "Position", id: "LIST" }],
    }),

    updatePosition: builder.mutation({
      query: (position: IPosition) => ({
        url: `/positions/${position.id}`,
        method: "PATCH",
        body: position,
      }),
      invalidatesTags: [{ type: "Position", id: "LIST" }],
    }),

    deletePosition: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/positions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Position", id: "LIST" }],
    }),
  }),
});

export const {
  useAddPositionMutation,
  useDeletePositionMutation,
  useGetPositionQuery,
  useGetPositionsQuery,
  useGetPositionsOfCompanyQuery,
  useUpdatePositionMutation,
} = positionApiSlice;
