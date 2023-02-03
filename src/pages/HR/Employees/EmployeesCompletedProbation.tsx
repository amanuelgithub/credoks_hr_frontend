import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../../app/hooks";
import DataGridToolbar from "../../../components/DataGridToolbar";
import { EmploymentStatusEnum, IEmployee } from "../../../models/IEmployee";
import {
  useGetEmployeesWithCompletedProbationOfaCompanyQuery,
  useUpdateEmploymentStatusMutation,
} from "../../../services/employeeApiSlice";
import { errorToast, successToast } from "../../../utils/toastify";

type Row = IEmployee;

let initialEmployees: any[] = [];

function EmployeesCompletedProbation() {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const [employees, setEmployees] = useState(initialEmployees);
  const { data } =
    useGetEmployeesWithCompletedProbationOfaCompanyQuery(companyId);
  // employe status change controller
  const [
    updateEmploymentStatus,
    { isError: unableToUpdateEmpStatus, isSuccess: empStatusUpdatedSuccess },
  ] = useUpdateEmploymentStatusMutation();
  // related to updating employment-status of employee
  const [selectedIdToUpdateEmpStatus, setSelectedIdToUpdateEmpStatus] =
    useState("");
  const [employementStatus, setEmployementStatus] =
    useState<EmploymentStatusEnum>();

  // employee status change starts here
  const handleUpdateEmploymentStatus = async ({
    id,
    body,
  }: {
    id: string;
    body: { employmentStatus: EmploymentStatusEnum };
  }) => {
    try {
      await updateEmploymentStatus({
        id,
        body,
      }).unwrap();

      console.log("updateEmploymentStatus");
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };
  const handleEmploymentStatusChange = (e: any, empId: string) => {
    e.preventDefault();

    setSelectedIdToUpdateEmpStatus(empId);
    setEmployementStatus(e.target.value);
  };
  useEffect(() => {
    handleUpdateEmploymentStatus({
      id: selectedIdToUpdateEmpStatus,
      body: {
        employmentStatus: employementStatus ?? EmploymentStatusEnum.TRAINEE,
      },
    });
  }, [selectedIdToUpdateEmpStatus]);
  // employee status change end here

  useEffect(() => {
    if (data !== undefined) {
      let fetchedEmployees = data !== undefined ? data : [];
      setEmployees(fetchedEmployees);
    }

    return () => {
      setEmployees(initialEmployees);
    };
  }, [data]);

  useEffect(() => {
    // create a success or error notifications based on the employment-status of employees
    if (empStatusUpdatedSuccess) {
      successToast("Employee status updated!");
    } else if (unableToUpdateEmpStatus) {
      errorToast("Unable to update employment status!");
    }
  }, [empStatusUpdatedSuccess, unableToUpdateEmpStatus]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "#ID", width: 60 },
      {
        field: "profileImage",
        renderCell: (params) => {
          return (
            <Avatar
              alt={`${params.row.firstName} ${params.row.fatherName}`}
              src={`http://localhost:3001/api/employees/profile-images/${
                params.row?.profileImage ?? ""
              }`}
              // src="/static/images/avatar/2.jpg"
              sx={{ bgcolor: "secondary.main", width: 60, height: 60 }}
            />
          );
        },
      },
      {
        field: "firstName",
        headerName: "First Name",
        width: 140,
        renderCell: (params) => {
          return (
            <Link
              to={`/hr-dashboard/employees/detail/${params.row.id}`}
              state={{
                profileImage: params.row.profileImage,
              }}
              className="hover:underline text-blue-400"
            >
              {params.row.firstName}
            </Link>
          );
        },
      },
      { field: "fatherName", headerName: "Father Name", width: 140 },
      { field: "gender", headerName: "gender", width: 140 },
      { field: "phone", headerName: "Phone", width: 140 },
      {
        field: "email",
        headerName: "Email",
        width: 140,
        renderCell: (params) => {
          return (
            <Typography variant="body2" sx={{ textDecoration: "underline" }}>
              {params.row.email}
            </Typography>
          );
        },
      },
      { field: "type", headerName: "type", width: 140 },
      { field: "tinNumber", headerName: "TIN Number", width: 200 },
      {
        field: "employmentStatus",
        headerName: "Employment Status",
        width: 140,
        renderCell: (params) => {
          return (
            <FormControl fullWidth margin="normal" size="small">
              <Select
                defaultValue={params.row.employmentStatus}
                name="companyId"
                type="select"
                label="Employement Status"
                sx={{
                  bgcolor: `primary.main`,
                  borderRadius: 8,
                  border: "1px solid gray",
                }}
                // value={undefined}
                onChange={(e: any) => {
                  handleEmploymentStatusChange(e, params.row.id ?? "");
                }}
              >
                <MenuItem value={EmploymentStatusEnum.CONFIRMED}>
                  {EmploymentStatusEnum.CONFIRMED}
                </MenuItem>
                <MenuItem value={EmploymentStatusEnum.CONTRACT}>
                  {EmploymentStatusEnum.CONTRACT}
                </MenuItem>
                <MenuItem value={EmploymentStatusEnum.PROBAATION}>
                  {EmploymentStatusEnum.PROBAATION}
                </MenuItem>
                <MenuItem value={EmploymentStatusEnum.TRAINEE}>
                  {EmploymentStatusEnum.TRAINEE}
                </MenuItem>
              </Select>
            </FormControl>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <ToastContainer />

      <div>
        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          rowHeight={75}
          autoHeight
          loading={false}
          error={undefined}
          components={{
            Toolbar: DataGridToolbar,
          }}
        />
      </div>
    </div>
  );
}

export default EmployeesCompletedProbation;
