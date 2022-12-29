import React, { useEffect, useState } from "react";
import {
  DataGrid,
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
import { ILocation } from "../../../models/ILocation";
import {
  useDeleteLocationMutation,
  useGetLocationsQuery,
} from "../../../services/locationApiSlice";
import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
import DataGridToolbar from "../../../components/DataGridToolbar";

type Row = ILocation;

let initialLocations: ILocation[] = [];

function Locations() {
  const [locations, setLocations] = useState(initialLocations);
  const { data } = useGetLocationsQuery();
  const [deleteLocation] = useDeleteLocationMutation();

  // add location modal state controller
  const [openAddLocationModal, setOpenAddLocationModal] = useState(false);
  const handleOpenAddLocationModal = () => setOpenAddLocationModal(true);
  const handleCloseAddLocationModal = () => setOpenAddLocationModal(false);

  // edit location modal state controller
  const [idToBeEdited, setIdToBeEdited] = useState("");
  const [openEditLocationModal, setOpenEditLocationModal] = useState(false);
  const handleOpenEditLocationModal = () => setOpenEditLocationModal(true);
  const handleCloseEditLocationModal = () => setOpenEditLocationModal(false);

  // confirmation dialog/modal state controller
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data !== undefined) {
      let fetchedLocations = data !== undefined ? data : [];
      setLocations(fetchedLocations);
    }

    return () => {
      setLocations(initialLocations);
    };
  }, [data]);

  const handleMoreLocationFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      navigate(`/admin-dashboard/locations/detail/${id}`);
    },
    []
  );

  const handleDeleteLocationFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      setIdToBeDeleted(id.toString());
      handleOpenDeleteModal();
    },
    []
  );

  const handleEditLocationFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      handleOpenEditLocationModal();
      setIdToBeEdited(id.toString());
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "country", headerName: "Country", width: 150 },
      { field: "region", headerName: "Region", width: 150 },
      { field: "woreda", headerName: "Woreda", width: 150 },
      { field: "city", headerName: "City", width: 200 },
      {
        field: "specificLocationName",
        headerName: "Specific Area Name",
        width: 150,
      },
      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<MoreIcon />}
            label="Detail"
            onClick={handleMoreLocationFieldAction(params.id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditLocationFieldAction(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteLocationFieldAction(params.id)}
          />,
        ],
      },
    ],
    [
      handleMoreLocationFieldAction,
      handleDeleteLocationFieldAction,
      handleEditLocationFieldAction,
    ]
  );

  // hander to delete an location
  const handleDeleteLocation = (id: string) => {
    handleCloseDeleteModal();
    deleteLocation(id);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      {/* delete location dialog */}
      {idToBeDeleted && (
        <DeleteModal
          id={idToBeDeleted}
          name="Location"
          openModal={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleDelete={handleDeleteLocation}
        />
      )}

      <AddLocation
        openModal={openAddLocationModal}
        handleCloseModal={handleCloseAddLocationModal}
      />

      {idToBeEdited && (
        <EditLocation
          key={idToBeEdited}
          id={idToBeEdited}
          openModal={openEditLocationModal}
          handleCloseModal={handleCloseEditLocationModal}
        />
      )}

      <Button
        sx={{ my: 2 }}
        variant="contained"
        onClick={handleOpenAddLocationModal}
      >
        + Add Location
      </Button>

      <DataGrid
        rows={locations}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        loading={false}
        error={undefined}
        components={{
          Toolbar: DataGridToolbar,
        }}
      />
    </div>
  );
}

export default Locations;
