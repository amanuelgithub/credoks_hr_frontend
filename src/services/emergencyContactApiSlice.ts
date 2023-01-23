import { apiSlice } from "../app/api/apiSlice";
import { IEmergencyContact } from "../models/IEmergencyContact";

export const emergencyContactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmergencyContactByEmployeeId: builder.query<IEmergencyContact[], any>({
      query: (employeeId: string) => ({
        url: `/emergency-contacts/employee/${employeeId}`,
      }),
      providesTags: [{ type: "EmergencyContact", id: "LIST" }],
      keepUnusedDataFor: 10,
    }),

    addEmergencyContact: builder.mutation({
      query: ({
        employeeId,
        emergencyContact,
      }: {
        employeeId: string;
        emergencyContact: IEmergencyContact;
      }) => ({
        url: `/emergency-contacts/${employeeId}`,
        method: "POST",
        body: emergencyContact,
      }),
      invalidatesTags: [{ type: "EmergencyContact", id: "LIST" }],
    }),

    deleteEmergencyContact: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/emergency-contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "EmergencyContact", id: "LIST" }],
    }),
  }),
});

export const {
  useAddEmergencyContactMutation,
  useGetEmergencyContactByEmployeeIdQuery,
  useDeleteEmergencyContactMutation,
} = emergencyContactApiSlice;
