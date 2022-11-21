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
import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "../../../services/employeeApiSlice";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/More";
import AddEmployee from "./AddEmployee";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { ToastContainer } from "react-toastify";
import EditEmployee from "./EditEmployee";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
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

function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);
  const { data } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  // add employee modal state controller
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const handleOpenAddEmployeeModal = () => setOpenAddEmployeeModal(true);
  const handleCloseAddEmployeeModal = () => setOpenAddEmployeeModal(false);

  // edit employee modal state controller
  const [idToBeEdited, setIdToBeEdited] = useState("");
  const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);
  const handleOpenEditEmployeeModal = () => setOpenEditEmployeeModal(true);
  const handleCloseEditEmployeeModal = () => setOpenEditEmployeeModal(false);

  // confirmation dialog/modal state controller
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

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

  const handleDeleteEmployeeFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      setIdToBeDeleted(id.toString());
      handleOpenDeleteModal();
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
      { field: "firstName", headerName: "First Name", width: 140 },
      { field: "fatherName", headerName: "Father Name", width: 140 },
      { field: "grandFatherName", headerName: "Grand Father Name", width: 140 },
      { field: "phone", headerName: "Phone", width: 140 },
      { field: "email", headerName: "Email", width: 140 },
      { field: "type", headerName: "type", width: 140 },
      { field: "accountNumber", headerName: "Account Number", width: 140 },
      { field: "gender", headerName: "gender", width: 140 },
      { field: "employmentStatus", headerName: "status", width: 140 },
      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<MoreIcon color="info" />}
            label="Detail"
            onClick={handleMoreEmployeeFieldAction(params.id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon color="success" />}
            label="Edit"
            onClick={handleEditEmployeeFieldAction(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color="warning" />}
            label="Delete"
            onClick={handleDeleteEmployeeFieldAction(params.id)}
          />,
        ],
      },
    ],
    [
      handleMoreEmployeeFieldAction,
      handleDeleteEmployeeFieldAction,
      handleEditEmployeeFieldAction,
    ]
  );

  // hander to delete an employee
  const handleDeleteEmployee = (id: string) => {
    handleCloseDeleteModal();
    deleteEmployee(id);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      {/* delete employee dialog */}
      {idToBeDeleted && (
        <DeleteModal
          id={idToBeDeleted}
          message={"Are you sure you want to delete this employee?"}
          openModal={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleDelete={handleDeleteEmployee}
        />
      )}

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
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginY="16px"
      >
        <Typography variant="h4"> Employees</Typography>
        <Button
          sx={{ my: 2, borderRadius: 8 }}
          variant="contained"
          onClick={handleOpenAddEmployeeModal}
          startIcon={<AddIcon />}
        >
          Add Employee
        </Button>
      </Box>

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

export default Employees;
