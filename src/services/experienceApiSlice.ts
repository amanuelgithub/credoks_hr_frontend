import { apiSlice } from "../app/api/apiSlice";
import { IExperience } from "../models/IExperience";

export const experienceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExperiencesByEmployeeId: builder.query<IExperience[], any>({
      query: (employeeId: string) => ({
        url: `/experiences/employee/${employeeId}`,
      }),
      providesTags: [{ type: "Experience", id: "LIST" }],
      keepUnusedDataFor: 10,
    }),

    addExperience: builder.mutation({
      query: ({
        employeeId,
        experience,
      }: {
        employeeId: string;
        experience: IExperience;
      }) => ({
        url: `/experiences/${employeeId}`,
        method: "POST",
        body: experience,
      }),
      invalidatesTags: [{ type: "Experience", id: "LIST" }],
    }),
  }),
});

export const { useAddExperienceMutation, useGetExperiencesByEmployeeIdQuery } =
  experienceApiSlice;
