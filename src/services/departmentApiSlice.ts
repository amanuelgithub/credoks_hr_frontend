import { apiSlice } from "../app/api/apiSlice";
import { IDepartment } from "../models/IDepartment";

export const departmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<any[], void>({
      query: () => ({ url: "/departments" }),
      providesTags: [{ type: "Department", id: "LIST" }],
    }),

    getDepartment: builder.query({
      query: (id: string | undefined) => ({ url: `/departments/${id}` }),
      providesTags: [{ type: "Department", id: "LIST" }],
    }),

    addDepartment: builder.mutation({
      query: (department: IDepartment) => ({
        url: "/departments",
        method: "POST",
        body: department,
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    updateDepartment: builder.mutation({
      query: (department: IDepartment) => ({
        url: `/departments/${department.id}`,
        method: "PATCH",
        body: department,
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),

    deleteDepartment: builder.mutation({
      query: (id: string | undefined) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
  }),
});

export const {
  useAddDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
  useGetDepartmentsQuery,
} = departmentApiSlice;