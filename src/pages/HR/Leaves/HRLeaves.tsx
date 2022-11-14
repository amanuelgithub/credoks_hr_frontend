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
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer } from "react-toastify";
import { ILeave } from "../../../models/ILeave";
import { useGetLeavesInCompanyQuery } from "../../../services/leaveApiSlice";
import { useAppSelector } from "../../../app/hooks";

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

type Row = ILeave;

let initialLeaves: any[] = [];

function HRLeaves() {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const [leaves, setLeaves] = useState(initialLeaves);
  const { data } = useGetLeavesInCompanyQuery(companyId);

  useEffect(() => {
    if (data !== undefined) {
      let fetchedLeaves = data !== undefined ? data : [];
      setLeaves(fetchedLeaves);
    }

    return () => {
      setLeaves(initialLeaves);
    };
  }, [data]);

  const handleEditEmployeeFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      console.log("update leave status => leave id: ", id);
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "leaveType", headerName: "Leave Type", width: 140 },
      { field: "requestedDays", headerName: "Requested Days", width: 140 },
      { field: "garantedDays", headerName: "Garanted Days", width: 140 },
      { field: "leaveStatus", headerName: "Leave Status", width: 140 },
      { field: "createdAt", headerName: "Created At", width: 140 },
      { field: "updatedAt", headerName: "Updated At", width: 140 },
      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditEmployeeFieldAction(params.id)}
          />,
        ],
      },
    ],
    [handleEditEmployeeFieldAction]
  );

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      {/* react-toastifiy container */}
      <ToastContainer />

      <DataGrid
        rows={leaves}
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

export default HRLeaves;
