import { apiSlice } from "../app/api/apiSlice";
import { IEmployee } from "../models/IEmployee";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<any[], void>({
      query: () => ({ url: "/employees" }),
      providesTags: [{ type: "Employee", id: "LIST" }],
      keepUnusedDataFor: 10,
    }),

    getEmployee: builder.query<IEmployee, any>({
      query: (id: string | undefined) => ({ url: `/employees/${id}` }),
      providesTags: [{ type: "Employee", id: "LIST" }],
    }),

    addEmployee: builder.mutation({
      query: (employee: IEmployee) => ({
        url: "/employees",
        method: "POST",
        body: employee,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    updateEmployee: builder.mutation({
      query: (employee: IEmployee) => ({
        url: `/employees/${employee.id}`,
        method: "PATCH",
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
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApiSlice;
