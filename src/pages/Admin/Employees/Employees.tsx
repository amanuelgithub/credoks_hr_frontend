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
import AddEmployee from "./AddEmployee";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { ToastContainer } from "react-toastify";

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

function Employees() {
  const {
    data: employees,
    isLoading: isLoading,
    isSuccess: isLoaded,
  } = useGetEmployeesQuery();
  const [
    deleteEmployee,
    { isLoading: isDeleting, isSuccess: isDeleted, isError },
  ] = useDeleteEmployeeMutation();
  const [flatEmployees, setFlatEmployees] = useState([]);

  // add employee modal state controller
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // confirmation dialog/modal state controller
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    if (employees !== undefined) {
      let employee;
      const flatEmployeesArr: any = [];
      for (let i = 0; i < employees.length; i++) {
        const { user, ...remaining } = employees[i];
        employee = { ...user, ...remaining };
        flatEmployeesArr.push(employee);
      }
      setFlatEmployees(flatEmployeesArr);
    }
  }, [employees]);

  // hander to delete an employee
  const handleDeleteEmployee = (id: string) => {
    handleCloseDeleteModal();
    deleteEmployee(id);
  };

  const handleDeleteSubject = React.useCallback(
    (id: GridRowId) => () => {
      // console.log("delete id: ", id);
      handleOpenDeleteModal();
      setIdToBeDeleted(id.toString());
    },
    []
  );

  const handleEditSubject = React.useCallback(
    (id: GridRowId) => () => {
      console.log("edit id: ", id);
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
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditSubject(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteSubject(params.id)}
          />,
        ],
      },
    ],
    [handleDeleteSubject, handleEditSubject]
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      {/* delete employee dialog */}
      <DeleteModal
        id={idToBeDeleted}
        message={"Are you sure you want to delete this employee?"}
        openModal={openDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleDelete={handleDeleteEmployee}
      />

      <Button sx={{ my: 2 }} variant="outlined" onClick={handleOpenModal}>
        + Add Employee
      </Button>
      <AddEmployee openModal={openModal} handleCloseModal={handleCloseModal} />

      <DataGrid
        rows={flatEmployees}
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
