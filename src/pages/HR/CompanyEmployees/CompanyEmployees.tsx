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
// import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
// import EditEmployee from "./EditEmployee";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { successToast } from "../../../utils/toastify";
import AddIcon from "@mui/icons-material/Add";

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
      { field: "id", headerName: "ID", width: 80 },
      { field: "firstName", headerName: "First Name", width: 140 },
      { field: "fatherName", headerName: "Father Name", width: 140 },
      { field: "grandFatherName", headerName: "Grand Father Name", width: 140 },
      { field: "phone", headerName: "Phone", width: 140 },
      { field: "email", headerName: "Email", width: 140 },
      { field: "type", headerName: "User Type", width: 140 },
      { field: "gender", headerName: "Gender", width: 140 },
      {
        field: "employmentStatus",
        headerName: "Employment Status",
        width: 140,
      },
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
        <Button
          sx={{ my: 2, borderRadius: 8 }}
          variant="contained"
          startIcon={<AddIcon />}
        >
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
