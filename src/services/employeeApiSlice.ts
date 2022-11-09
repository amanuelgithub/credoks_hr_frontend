import { apiSlice } from "../app/api/apiSlice";
import { ICompanyEmployeeReport } from "../models/ICompanyEmployeeReport";
import { IEmployee } from "../models/IEmployee";

export const employeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * returns all employees all the companies.
     */
    getEmployees: builder.query<any[], void>({
      query: () => ({ url: "/employees" }),
      providesTags: [{ type: "Employee", id: "LIST" }],
      keepUnusedDataFor: 10,
    }),

    /**
     * returns all employees of the specified company.
     */
    getEmployeesByCompany: builder.query<any[], any>({
      query: (companyId: string) => ({
        url: `/employees/company/${companyId}`,
      }),
      providesTags: [{ type: "Employee", id: "LIST" }],
      keepUnusedDataFor: 10,
    }),

    getEmployee: builder.query<IEmployee, any>({
      query: (id: string | undefined) => ({ url: `/employees/${id}` }),
      providesTags: [{ type: "Employee", id: "LIST" }],
    }),

    addEmployee: builder.mutation({
      query: ({
        companyId,
        employee,
      }: {
        companyId: string;
        employee: IEmployee;
      }) => ({
        url: `/employees/company/${companyId}`,
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

    getCompaniesEmployeesReport: builder.query<ICompanyEmployeeReport[], void>({
      query: () => ({ url: "/employees/report/company-employees-report" }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeesByCompanyQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  // reportting
  useGetCompaniesEmployeesReportQuery,
} = employeeApiSlice;
