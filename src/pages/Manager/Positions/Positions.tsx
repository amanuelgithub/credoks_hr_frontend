import Button from "@mui/material/Button";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../../../app/hooks";
import DataGridToolbar from "../../../components/DataGridToolbar";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import { IPosition } from "../../../models/IPosition";
import {
  useDeletePositionMutation,
  useGetPositionsOfCompanyQuery,
} from "../../../services/positionApiSlice";
import { errorToast, successToast } from "../../../utils/toastify";
import AddPosition from "./AddPosition";
import Breadcrumbs from "../../../components/Breadcrumbs";

type Row = IPosition;

let initialPositions: IPosition[] = [];

function Positions() {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const [positions, setPositions] = useState(initialPositions);
  const { data } = useGetPositionsOfCompanyQuery(companyId);

  const [
    deletePosition,
    { isSuccess: deletedPosition, isError: errorDeletingPosition },
  ] = useDeletePositionMutation();

  const [openAddPositionModal, setOpenAddPositionModal] = useState(false);

  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setPositions(data ?? []);
  }, [data]);

  useEffect(() => {
    if (deletedPosition) {
      successToast("Positions added successfully");
    }
    if (errorDeletingPosition) {
      errorToast("Error creating position");
    }
  }, [deletedPosition, errorDeletingPosition]);

  const handleDeletePositionFieldAction = useCallback(
    (id: GridRowId) => () => {
      setIdToBeDeleted(id.toString());
      setOpenDeleteModal(true);
    },
    []
  );

  const columns = useMemo<GridColumns<Row>>(
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
    deletePosition(id);
    setOpenDeleteModal(false);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      {/* delete employee dialog */}
      {idToBeDeleted && (
        <DeleteModal
          id={idToBeDeleted}
          name="Position"
          openModal={openDeleteModal}
          handleCloseModal={() => setOpenDeleteModal(false)}
          handleDelete={handleDeletePosition}
        />
      )}

      <AddPosition
        openModal={openAddPositionModal}
        handleCloseModal={() => setOpenAddPositionModal(false)}
      />

      <Button
        sx={{ my: 2 }}
        variant="contained"
        onClick={() => setOpenAddPositionModal(true)}
      >
        + Add Position
      </Button>

      <Breadcrumbs />

      <DataGrid
        rows={positions}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={false}
        error={undefined}
        isRowSelectable={(_params) => false}
        components={{
          Toolbar: DataGridToolbar,
        }}
      />
    </div>
  );
}

export default Positions;
