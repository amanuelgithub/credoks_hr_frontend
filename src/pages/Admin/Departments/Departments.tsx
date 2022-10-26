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
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/More";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditEmployee from "../Employees/EditEmployee";
import { IDepartment } from "../../../models/IDepartment";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsQuery,
} from "../../../services/departmentApiSlice";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";

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

type Row = IDepartment;

let initialDepartments: any[] = [];

function Departments() {
  const [departments, setDepartments] = useState(initialDepartments);
  const {
    data,
    isLoading: isLoading,
    isSuccess: isLoaded,
  } = useGetDepartmentsQuery();
  const [
    deleteDepartment,
    { isLoading: isDeleting, isSuccess: isDeleted, isError },
  ] = useDeleteDepartmentMutation();

  // add department modal state controller
  const [openAddDepartmentModal, setOpenAddDepartmentModal] = useState(false);
  const handleOpenAddDepartmentModal = () => setOpenAddDepartmentModal(true);
  const handleCloseAddDepartmentModal = () => setOpenAddDepartmentModal(false);

  // edit department modal state controller
  const [idToBeEdited, setIdToBeEdited] = useState("");
  const [openEditDepartmentModal, setOpenEditDepartmentModal] = useState(false);
  const handleOpenEditDepartmentModal = () => setOpenEditDepartmentModal(true);
  const handleCloseEditDepartmentModal = () =>
    setOpenEditDepartmentModal(false);

  // confirmation dialog/modal state controller
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data !== undefined) {
      let fetchedDepartment = data !== undefined ? data : [];
      setDepartments(fetchedDepartment);
    }

    return () => {
      setDepartments(initialDepartments);
    };
  }, [data]);

  const handleMoreDepartmentFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      navigate(`/admin-dashboard/departments/detail/${id}`);
    },
    []
  );

  const handleDeleteDepartmentFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      setIdToBeDeleted(id.toString());
      handleOpenDeleteModal();
    },
    []
  );

  const handleEditDepartmentFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      handleOpenEditDepartmentModal();
      setIdToBeEdited(id.toString());
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "description", headerName: "Description", width: 200 },
      { field: "company", headerName: "company", width: 150 },
      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<MoreIcon />}
            label="Detail"
            onClick={handleMoreDepartmentFieldAction(params.id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditDepartmentFieldAction(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteDepartmentFieldAction(params.id)}
          />,
        ],
      },
    ],
    [
      handleMoreDepartmentFieldAction,
      handleDeleteDepartmentFieldAction,
      handleEditDepartmentFieldAction,
    ]
  );

  // hander to delete an employee
  const handleDeleteDepartment = (id: string) => {
    handleCloseDeleteModal();
    deleteDepartment(id);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      {/* delete employee dialog */}
      {idToBeDeleted && (
        <DeleteModal
          id={idToBeDeleted}
          message={"Are you sure you want to delete this Department?"}
          openModal={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleDelete={handleDeleteDepartment}
        />
      )}

      <AddDepartment
        openModal={openAddDepartmentModal}
        handleCloseModal={handleCloseAddDepartmentModal}
      />

      {idToBeEdited && (
        <EditDepartment
          key={idToBeEdited}
          id={idToBeEdited}
          openModal={openEditDepartmentModal}
          handleCloseModal={handleCloseEditDepartmentModal}
        />
      )}

      <Button
        sx={{ my: 2 }}
        variant="outlined"
        onClick={handleOpenAddDepartmentModal}
      >
        + Add Department
      </Button>

      <DataGrid
        rows={departments}
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

export default Departments;
