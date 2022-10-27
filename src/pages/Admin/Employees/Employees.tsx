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
          <GridActionsCellItem
            icon={<DeleteIcon />}
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
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

export default Employees;
