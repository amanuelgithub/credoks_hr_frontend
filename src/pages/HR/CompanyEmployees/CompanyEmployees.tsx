import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import { IEmployee } from "../../../models/IEmployee";
import { useGetEmployeesByCompanyQuery } from "../../../services/employeeApiSlice";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/More";
import { ToastContainer } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { successToast } from "../../../utils/toastify";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

type Row = IEmployee;

let initialEmployees: any[] = [];

function CompanyEmployees() {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const [employees, setEmployees] = useState(initialEmployees);

  const { data } = useGetEmployeesByCompanyQuery(companyId);

  const [showEmployeeAddedMsg, setShowEmployeeAddedMsg] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const message: string | undefined | null = location.state?.message;

    if (message) {
      setShowEmployeeAddedMsg(true);
    }
    return () => {
      setShowEmployeeAddedMsg(false);
    };
  }, [location.state]);

  useEffect(() => {
    if (showEmployeeAddedMsg) {
      successToast("Employee added successfully");
    }
    return () => {
      setShowEmployeeAddedMsg(false);
    };
  }, [showEmployeeAddedMsg]);

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
    if (data !== undefined) {
      let fetchedEmployees = data !== undefined ? data : [];
      setEmployees(fetchedEmployees);
    }

    return () => {
      setEmployees(initialEmployees);
    };
  }, [data]);

  const handleMoreEmployeeFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      navigate(`/admin-dashboard/employees/detail/${id}`);
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "#ID", width: 60 },
      {
        field: "profileImage",
        renderCell: (params) => {
          return (
            <Avatar
              alt={`${params.row.firstName} ${params.row.fatherName}`}
              src="/static/images/avatar/2.jpg"
              sx={{ bgcolor: "secondary.main" }}
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
              to={`/admin-dashboard/employees/detail/${params.row.id}`}
              className="hover:underline text-blue-400"
            >
              {params.row.firstName}
            </Link>
          );
        },
      },
      { field: "fatherName", headerName: "Father Name", width: 140 },
      { field: "grandFatherName", headerName: "Grand Father Name", width: 140 },
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
      { field: "bankName", headerName: "Bank Name", width: 140 },
      {
        field: "bankAccountNumber",
        headerName: "Bank Account Number",
        width: 140,
      },
      { field: "tinNumber", headerName: "TIN Number", width: 200 },
      { field: "gender", headerName: "gender", width: 140 },
      { field: "employmentStatus", headerName: "status", width: 140 },
      { field: "maritalStatus", headerName: "Marital Status", width: 140 },
      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<MoreIcon />}
            label="Detail"
            onClick={handleMoreEmployeeFieldAction(params.id)}
          />,
        ],
      },
    ],
    [handleMoreEmployeeFieldAction]
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ToastContainer />

      <Link to="/hr-dashboard/employees/add">
        <Button sx={{ my: 2 }} variant="contained" startIcon={<AddIcon />}>
          Add Employee
        </Button>
      </Link>

      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={false}
        error={undefined}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

export default CompanyEmployees;
