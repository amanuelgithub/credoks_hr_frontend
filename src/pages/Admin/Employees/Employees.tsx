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
  gridClasses,
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
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { alpha, styled } from "@mui/material/styles";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

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
            icon={<EditIcon sx={{ color: "secondary.main" }} />}
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

      <StripedDataGrid
        rows={employees}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={false}
        error={undefined}
        isRowSelectable={(_params) => false}
        components={{
          Toolbar: CustomToolbar,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </div>
  );
}

export default Employees;
