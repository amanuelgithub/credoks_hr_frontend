import React, { useState, useEffect } from "react";
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
import { ICompany } from "../../../models/ICompany";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
} from "../../../services/companyApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

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

type Row = ICompany;

let initialCompanies: any[] = [];

function Companies() {
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenModal = () => setOpenDeleteModal(true);
  const handleCloseModal = () => setOpenDeleteModal(false);

  const [companies, setCompanies] = useState(initialCompanies);
  const { data, isLoading, isSuccess } = useGetCompaniesQuery();
  const [deleteCompany, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteCompanyMutation();

  const navigate = useNavigate();

  // a function to delete a company
  const handleDeleteCompany = (id: string) => {
    handleCloseModal();
    deleteCompany(id);
  };

  const handleDeleteSubject = React.useCallback(
    (id: GridRowId) => () => {
      handleOpenModal();
      setIdToBeDeleted(id.toString());
    },
    []
  );

  const handleEditSubject = React.useCallback(
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
    if (isDeleted) {
      toast.success("Company deleted successfully", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  }, [isDeleted]);

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
      <ToastContainer />

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
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

export default Companies;
