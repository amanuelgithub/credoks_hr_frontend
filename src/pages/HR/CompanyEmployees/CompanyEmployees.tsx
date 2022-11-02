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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IEmployee } from "../../../models/IEmployee";
import { useGetEmployeesByCompanyQuery } from "../../../services/employeeApiSlice";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/More";
// import AddEmployee from "./AddEmployee";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { ToastContainer } from "react-toastify";
// import EditEmployee from "./EditEmployee";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

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

  // add employee modal state controller
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const handleOpenAddEmployeeModal = () => setOpenAddEmployeeModal(true);
  const handleCloseAddEmployeeModal = () => setOpenAddEmployeeModal(false);

  // edit employee modal state controller
  const [idToBeEdited, setIdToBeEdited] = useState("");
  const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);
  const handleOpenEditEmployeeModal = () => setOpenEditEmployeeModal(true);
  const handleCloseEditEmployeeModal = () => setOpenEditEmployeeModal(false);

  const navigate = useNavigate();

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

  const handleEditEmployeeFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      handleOpenEditEmployeeModal();
      setIdToBeEdited(id.toString());
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "firstName", headerName: "firstName", width: 140 },
      { field: "lastName", headerName: "LastName", width: 140 },
      { field: "phone", headerName: "phone", width: 140 },
      { field: "email", headerName: "email", width: 140 },
      { field: "type", headerName: "type", width: 140 },
      { field: "gender", headerName: "gender", width: 140 },
      { field: "status", headerName: "status", width: 140 },
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
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditEmployeeFieldAction(params.id)}
          />,
        ],
      },
    ],
    [handleMoreEmployeeFieldAction, handleEditEmployeeFieldAction]
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      {/* 
      <AddEmployee
        openModal={openAddEmployeeModal}
        handleCloseModal={handleCloseAddEmployeeModal}
      />

      {idToBeEdited && (
        <EditEmployee
          key={idToBeEdited}
          id={idToBeEdited}
          openModal={openEditEmployeeModal}
          handleCloseModal={handleCloseEditEmployeeModal}
        />
      )} */}

      <Button
        sx={{ my: 2 }}
        variant="outlined"
        onClick={handleOpenAddEmployeeModal}
      >
        + Add Employee
      </Button>

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
