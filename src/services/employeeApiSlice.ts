import { apiSlice } from "../app/api/apiSlice";
import { ICompanyEmployeeReport } from "../models/ICompanyEmployeeReport";
import { EmploymentStatusEnum, IEmployee } from "../models/IEmployee";

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

    getEmployeesWithCompletedProbationOfaCompany: builder.query<any[], any>({
      query: (companyId: string) => ({
        url: `/employees/company/probation-completed/${companyId}`,
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

    updateEmploymentStatus: builder.mutation({
      query: ({
        id,
        body,
      }: {
        id: string;
        body: { employmentStatus: EmploymentStatusEnum };
      }) => ({
        url: `/employees/${id}/update-employement-status`,
        method: "PATCH",
        body: body,
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

    uploadProfileImage: builder.mutation({
      query: ({ id, file }: { id: string | undefined; file: any }) => ({
        url: `/employees/upload-profile-img/${id}`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    uploadCV: builder.mutation({
      query: ({ id, file }: { id: string | undefined; file: any }) => ({
        url: `/employees/${id}/upload-cv`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    changePassword: builder.mutation({
      query: ({
        employeeId,
        changePassword,
      }: {
        employeeId: string;
        changePassword: { password: string };
      }) => ({
        url: `/employees/${employeeId}/change-password`,
        method: "PATCH",
        body: changePassword,
      }),
    }),

    /** this function has some issues */
    getEmployeeProfileImage: builder.query<any, any>({
      query: (imagename: string) => ({
        url: `/employees/profile-images/${imagename}`,
      }),
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
  useUpdateEmploymentStatusMutation,
  useGetEmployeeProfileImageQuery,
  useUploadProfileImageMutation,
  useUploadCVMutation,
  useChangePasswordMutation,
  // reportting
  useGetCompaniesEmployeesReportQuery,
  useGetEmployeesWithCompletedProbationOfaCompanyQuery,
} = employeeApiSlice;
