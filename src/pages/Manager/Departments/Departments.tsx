import { useState, useEffect, useMemo, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import { IDepartment } from "../../../models/IDepartment";
import { ToastContainer } from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddDepartment from "./AddDepartment";
import EditDepartment from "../../../components/EditDepartmentModal/EditDepartment";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsOfCompanyQuery,
} from "../../../services/departmentApiSlice";
import { useAppSelector } from "../../../app/hooks";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { errorToast, successToast } from "../../../utils/toastify";
import DataGridToolbar from "../../../components/DataGridToolbar";
import Breadcrumbs from "../../../components/Breadcrumbs";

type Row = IDepartment;

const initialDepartments: IDepartment[] = [];

function Departments() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const [departments, setDepartments] = useState(initialDepartments);
  const { data } = useGetDepartmentsOfCompanyQuery(companyId);

  const [openAddDepartmentModal, setOpenAddDepartmentModal] = useState(false);

  // edit department modal state controller
  const [idToBeEdited, setIdToBeEdited] = useState("");
  const [openEditDepartmentModal, setOpenEditDepartmentModal] = useState(false);
  const handleOpenEditDepartmentModal = () => setOpenEditDepartmentModal(true);
  const handleCloseEditDepartmentModal = () =>
    setOpenEditDepartmentModal(false);

  // delete confirmation dialog/modal state controller
  const [idTobeDeleted, setIdTobeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [
    deleteDepartment,
    { isSuccess: departmentDeleted, isError: errorDeletingDepart },
  ] = useDeleteDepartmentMutation();

  useEffect(() => {
    setDepartments(data ?? []);
  }, [data]);

  useEffect(() => {
    if (departmentDeleted) {
      successToast("Departments deleted successfully");
    }
    if (errorDeletingDepart) {
      errorToast("Error deleting department");
    }
  }, [departmentDeleted, errorDeletingDepart]);

  const handleEditDepartmentFieldAction = useCallback(
    (id: GridRowId) => () => {
      setIdToBeEdited(id.toString());
      handleOpenEditDepartmentModal();
    },
    []
  );

  const handleDeleteDepartmentFieldAction = useCallback(
    (id: GridRowId) => () => {
      // delete the department
      setIdTobeDeleted(id.toString());
      setOpenDeleteModal(true);
    },
    []
  );

  const columns = useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 120 },
      { field: "name", headerName: "Department Name", width: 250 },
      { field: "description", headerName: "Description", width: 400 },
      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
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
    [handleEditDepartmentFieldAction, handleDeleteDepartmentFieldAction]
  );

  const handleDeleteDepartment = (id: string) => {
    deleteDepartment(id);
    setOpenDeleteModal(false);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ToastContainer />

      <AddDepartment
        openModal={openAddDepartmentModal}
        handleCloseModal={() => setOpenAddDepartmentModal(false)}
      />

      {/* delete department dialog */}
      {idTobeDeleted && (
        <DeleteModal
          id={idTobeDeleted}
          name="Department"
          openModal={openDeleteModal}
          handleCloseModal={() => setOpenDeleteModal(true)}
          handleDelete={handleDeleteDepartment}
        />
      )}

      {/* edit department modal */}
      {idToBeEdited && (
        <EditDepartment
          key={idToBeEdited}
          id={idToBeEdited}
          openModal={openEditDepartmentModal}
          handleCloseModal={handleCloseEditDepartmentModal}
        />
      )}

      <Breadcrumbs />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginY="16px"
      >
        <Typography variant="h4">Departments</Typography>
        <Button
          sx={{ my: 2 }}
          variant="contained"
          onClick={() => setOpenAddDepartmentModal(true)}
          startIcon={<AddIcon />}
        >
          Add Department
        </Button>
      </Box>

      <DataGrid
        rows={departments}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 15, 20]}
        autoHeight
        loading={!departments}
        components={{ Toolbar: DataGridToolbar }}
      />
    </div>
  );
}

export default Departments;
