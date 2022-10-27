import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { ICompany } from "../../../models/ICompany";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
} from "../../../services/companyApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { errorToast, successToast } from "../../../utils/toastify";
import Loading from "../../../components/Loading";

type Row = ICompany;

let initialCompanies: any[] = [];

function Companies() {
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenModal = () => setOpenDeleteModal(true);
  const handleCloseModal = () => setOpenDeleteModal(false);

  const [companies, setCompanies] = useState(initialCompanies);
  const { data, isLoading: isLoadingCompanies } = useGetCompaniesQuery();
  const [
    deleteCompany,
    { isSuccess: isDeletedCompany, isError: isErrorDeleteCompany },
  ] = useDeleteCompanyMutation();

  const navigate = useNavigate();

  // a function to delete a company
  const handleDeleteCompany = (id: string) => {
    handleCloseModal();
    deleteCompany(id);
  };

  // used by the mui DataGrid action field
  const handleDeleteCompanyFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      handleOpenModal();
      setIdToBeDeleted(id.toString());
    },
    []
  );
  // used by the mui DataGrid action field
  const handleEditCompanyFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      navigate(`/admin-dashboard/companies/edit/${id}`, { state: { id } });
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
      { field: "name", headerName: "name", width: 140 },
      { field: "summary", headerName: "summary", width: 140 },
      { field: "status", headerName: "status", width: 140 },
      { field: "companyLogo", headerName: "companyLogo", width: 140 },
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
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteCompanyFieldAction(params.id)}
          />,
        ],
      },
    ],
    [handleDeleteCompanyFieldAction, handleEditCompanyFieldAction]
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ToastContainer />

      {isLoadingCompanies ? <Loading /> : null}

      <DeleteModal
        id={idToBeDeleted}
        message={"Are you sure you want to delete this company?"}
        openModal={openDeleteModal}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDeleteCompany}
      />

      <Button variant="outlined" sx={{ my: 2 }}>
        <Link to="/admin-dashboard/companies/add">+ Add Company</Link>
      </Button>

      <DataGrid
        rows={companies ?? []}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={false}
        error={undefined}
        checkboxSelection
      />
    </div>
  );
}

export default Companies;
