import { apiSlice } from "../app/api/apiSlice";
import { IEmployee } from "../models/IEmployee";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any[], void>({
      query: () => ({ url: "/employees" }),
      providesTags: [{ type: "Employee", id: "LIST" }],
      // keepUnusedDataFor: 10,
    }),

    addEmployee: builder.mutation({
      query: (employee: IEmployee) => ({
        url: "/employees",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    deleteEmployee: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApiSlice;
