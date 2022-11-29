import { apiSlice } from "../app/api/apiSlice";
import { IQualification } from "../models/IQualification";

export const qualificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQualificationsByEmployeeId: builder.query<any[], any>({
      query: (employeeId: string) => ({
        url: `/qualifications/employee/${employeeId}`,
      }),
      providesTags: [{ type: "Qualification", id: "LIST" }],
      keepUnusedDataFor: 10,
    }),

    addQaualification: builder.mutation({
      query: ({
        employeeId,
        qualification,
      }: {
        employeeId: string;
        qualification: IQualification;
      }) => ({
        url: `/qualifications/${employeeId}`,
        method: "POST",
        body: qualification,
      }),
      invalidatesTags: [{ type: "Qualification", id: "LIST" }],
    }),
  }),
});

export const {
  useGetQualificationsByEmployeeIdQuery,
  useAddQaualificationMutation,
} = qualificationApiSlice;
