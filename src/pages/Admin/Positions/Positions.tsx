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
import Button from "@mui/material/Button";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { ToastContainer } from "react-toastify";
import { IPosition } from "../../../models/IPosition";
import {
  useDeletePositionMutation,
  useGetPositionsQuery,
} from "../../../services/positionApiSlice";
import AddPosition from "./AddPosition";

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

type Row = IPosition;

let initialPositions: IPosition[] = [];

function Positions() {
  const [positions, setPositions] = useState(initialPositions);
  const { data } = useGetPositionsQuery();
  const [deleteDepartment] = useDeletePositionMutation();

  // add position modal state controller
  const [openAddPositionModal, setOpenAddPositionModal] = useState(false);
  const handleOpenAddPositionModal = () => setOpenAddPositionModal(true);
  const handleCloseAddPositionModal = () => setOpenAddPositionModal(false);

  // confirmation dialog/modal state controller
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    if (data !== undefined) {
      let fetchedPosition = data !== undefined ? data : [];
      setPositions(fetchedPosition);
    }

    return () => {
      setPositions(initialPositions);
    };
  }, [data]);

  const handleDeletePositionFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      setIdToBeDeleted(id.toString());
      handleOpenDeleteModal();
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "title", headerName: "Title", width: 150 },
      { field: "qualification", headerName: "Qualification", width: 200 },
      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeletePositionFieldAction(params.id)}
          />,
        ],
      },
    ],
    [handleDeletePositionFieldAction]
  );

  // hander to delete an position
  const handleDeletePosition = (id: string) => {
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
          message={"Are you sure you want to delete this Position?"}
          openModal={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleDelete={handleDeletePosition}
        />
      )}

      <AddPosition
        openModal={openAddPositionModal}
        handleCloseModal={handleCloseAddPositionModal}
      />

      <Button
        sx={{ my: 2 }}
        variant="outlined"
        onClick={handleOpenAddPositionModal}
      >
        + Add Position
      </Button>

      <DataGrid
        rows={positions}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={false}
        error={undefined}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

export default Positions;
