import { apiSlice } from "../app/api/apiSlice";
import { IPosition } from "../models/IPosition";

export const positionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<any[], void>({
      query: () => ({ url: "/positions" }),
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
} = positionApiSlice;
