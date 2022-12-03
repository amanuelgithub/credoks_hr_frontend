import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { ICompany } from "../../../models/ICompany";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
} from "../../../services/companyApiSlice";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer } from "react-toastify";
import { errorToast, successToast } from "../../../utils/toastify";
import Loading from "../../../components/Loading";
import AddCompany from "./AddCompany";
import EditCompany from "./EditCompany";

type Row = ICompany;

let initialCompanies: any[] = [];

function Companies() {
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenModal = () => setOpenDeleteModal(true);
  const handleCloseModal = () => setOpenDeleteModal(false);

  // add company modal state conroller
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);
  const handleOpenAddCompanyModal = () => setOpenAddCompanyModal(true);
  const handleCloseAddCompanyModal = () => setOpenAddCompanyModal(false);

  // edit company modal state conroller
  const [idToBeEdited, setIdToBeEdited] = useState("");
  const [openEditCompanyModal, setOpenEditCompanyModal] = useState(false);
  const handleOpenEditCompanyModal = () => setOpenEditCompanyModal(true);
  const handleCloseEditCompanyModal = () => setOpenEditCompanyModal(false);

  const [companies, setCompanies] = useState(initialCompanies);
  const { data, isLoading: isLoadingCompanies } = useGetCompaniesQuery();
  const [
    deleteCompany,
    { isSuccess: isDeletedCompany, isError: isErrorDeleteCompany },
  ] = useDeleteCompanyMutation();

  // a function to delete a company
  // const handleDeleteCompany = (id: string) => {
  //   handleCloseModal();
  //   deleteCompany(id);
  // };

  const handleDeleteCompanyFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      handleOpenModal();
      setIdToBeDeleted(id.toString());
    },
    []
  );
  const handleEditCompanyFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      setIdToBeEdited(id.toString());
      handleOpenEditCompanyModal();
    },
    []
  );

  useEffect(() => {
    if (data !== undefined) {
      let fetchedCompanies = data !== undefined ? data : [];
      setCompanies(fetchedCompanies);
    }

    return () => {
      setCompanies(initialCompanies);
    };
  }, [data]);

  useEffect(() => {
    if (isDeletedCompany) successToast("Company deleted successfully");
    if (isErrorDeleteCompany) errorToast("Error deleting company");
  }, [isDeletedCompany, isErrorDeleteCompany]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "name", headerName: "Name", width: 140 },
      { field: "summary", headerName: "Summary", width: 300 },
      { field: "companyStatus", headerName: "Status", width: 140 },
      { field: "logo", headerName: "Company Logo", width: 140 },
      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditCompanyFieldAction(params.id)}
          />,
          // <GridActionsCellItem
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   onClick={handleDeleteCompanyFieldAction(params.id)}
          // />,
        ],
      },
    ],
    [handleDeleteCompanyFieldAction, handleEditCompanyFieldAction]
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ToastContainer />

      {isLoadingCompanies ? <Loading /> : null}

      <AddCompany
        openModal={openAddCompanyModal}
        handleCloseModal={handleCloseAddCompanyModal}
      />

      {idToBeEdited && (
        <EditCompany
          key={idToBeEdited}
          id={idToBeEdited}
          openModal={openEditCompanyModal}
          handleCloseModal={handleCloseEditCompanyModal}
        />
      )}

      {/* <DeleteModal
        id={idToBeDeleted}
        message={"Are you sure you want to delete this company?"}
        openModal={openDeleteModal}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDeleteCompany}
      /> */}

      <Button
        variant="contained"
        sx={{ my: 2 }}
        onClick={handleOpenAddCompanyModal}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Company
      </Button>

      <DataGrid
        rows={companies ?? []}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={false}
        error={undefined}
      />
    </div>
  );
}

export default Companies;
