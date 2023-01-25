import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  gridClasses,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { EmploymentStatusEnum, IEmployee } from "../../../models/IEmployee";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesByCompanyQuery,
  useUpdateEmploymentStatusMutation,
} from "../../../services/employeeApiSlice";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/More";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import EditEmployee from "./EditEmployee";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { alpha, styled } from "@mui/material/styles";
import DataGridToolbar from "../../../components/DataGridToolbar";
import AddEmployee from "./AddEmployee";
import { useAppSelector } from "../../../app/hooks";
import { FormControl, MenuItem, Select } from "@mui/material";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

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

type Row = IEmployee;

let initialEmployees: any[] = [];

function Employees() {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const [employees, setEmployees] = useState(initialEmployees);
  const { data } = useGetEmployeesByCompanyQuery(companyId);
  // const {} = useGetEmployeeProfileImageQuery();
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

  // employe status change controller
  const [updateEmploymentStatus, { isError, isSuccess }] =
    useUpdateEmploymentStatusMutation();
  const [selectedIdToUpdateEmpStatus, setSelectedIdToUpdateEmpStatus] =
    useState("");
  const [employementStatus, setEmployementStatus] =
    useState<EmploymentStatusEnum>();

  const navigate = useNavigate();

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

  const handleDeleteEmployeeFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      setIdToBeDeleted(id.toString());
      handleOpenDeleteModal();
    },
    []
  );

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

  // hander to delete an employee
  const handleDeleteEmployee = (id: string) => {
    handleCloseDeleteModal();
    deleteEmployee(id);
  };

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
              to={`/manager-dashboard/employees/detail/${params.row.id}`}
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
      { field: "salary", headerName: "Salary", width: 140 },
      { field: "bankName", headerName: "Bank Name", width: 140 },
      {
        field: "bankAccountNumber",
        headerName: "Bank Account Number",
        width: 140,
      },
      { field: "tinNumber", headerName: "TIN Number", width: 200 },
      { field: "gender", headerName: "gender", width: 140 },
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
                onChange={(e: any) =>
                  handleEmploymentStatusChange(e, params.row.id ?? "")
                }
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
            icon={
              <EditIcon
                sx={{
                  color: "secondary.main",
                }}
              />
            }
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

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      {/* delete employee dialog */}
      {idToBeDeleted && (
        <DeleteModal
          id={idToBeDeleted}
          name="Employee"
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
          sx={{ my: 2 }}
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
        rowHeight={75}
        loading={false}
        error={undefined}
        isRowSelectable={(_params) => false}
        components={{
          Toolbar: DataGridToolbar,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </div>
  );
}

export default Employees;
