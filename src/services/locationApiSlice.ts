import { apiSlice } from "../app/api/apiSlice";
import { ILocation } from "../models/ILocation";

export const locationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<any[], void>({
      query: () => ({ url: "/locations" }),
      providesTags: [{ type: "Location", id: "LIST" }],
    }),

    getLocation: builder.query({
      query: (id: string | undefined) => ({ url: `/locations/${id}` }),
      providesTags: [{ type: "Location", id: "LIST" }],
    }),

    addLocation: builder.mutation({
      query: (location: ILocation) => ({
        url: "/locations",
        method: "POST",
        body: location,
      }),
      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),

    updateLocation: builder.mutation({
      query: (location: ILocation) => ({
        url: `/locations/${location.id}`,
        method: "PATCH",
        body: location,
      }),
      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),

    deleteLocation: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),
  }),
});

export const {
  useAddLocationMutation,
  useDeleteLocationMutation,
  useGetLocationQuery,
  useGetLocationsQuery,
  useUpdateLocationMutation,
} = locationApiSlice;
