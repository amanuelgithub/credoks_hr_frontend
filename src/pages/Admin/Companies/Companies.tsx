import React from "react";
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
import { useGetCompaniesQuery } from "../../../services/companyApiSlice";
import { Link } from "react-router-dom";

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

function Companies() {
  const { data, isLoading, isSuccess } = useGetCompaniesQuery();

  const handleDeleteSubject = React.useCallback(
    (id: GridRowId) => () => {},
    []
  );

  const handleEditSubject = React.useCallback((id: GridRowId) => () => {}, []);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "name", headerName: "name", width: 140 },
      { field: "companyLogo", headerName: "companyLogo", width: 140 },
      { field: "status", headerName: "status", width: 140 },
      { field: "summary", headerName: "summary", width: 140 },
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
      <Button variant="outlined" sx={{ my: 2 }}>
        <Link to="/admin-dashboard/companies/add">+ Add Company</Link>
      </Button>

      <DataGrid
        rows={data ?? []}
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
