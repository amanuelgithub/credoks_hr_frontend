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
import EditIcon from "@mui/icons-material/Edit";
import { IEmployee } from "../../../models/IEmployee";
import { useGetEmployeesQuery } from "../../../services/employeeApiSlice";

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

function Employees() {
  const { data: employees, isLoading, isSuccess } = useGetEmployeesQuery();
  const [flatEmployees, setFlatEmployees] = useState([]);

  useEffect(() => {
    if (employees !== undefined) {
      let employee;
      const flatEmployeesArr: any = [];
      for (let i = 0; i < employees.length; i++) {
        const { user, ...remaining } = employees[i];
        employee = { ...user, ...remaining };
        flatEmployeesArr.push(employee);
      }
      setFlatEmployees(flatEmployeesArr);
    }
  }, [employees]);

  const handleDeleteSubject = React.useCallback(
    (id: GridRowId) => () => {},
    []
  );

  const handleEditSubject = React.useCallback((id: GridRowId) => () => {}, []);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "ID", width: 80 },
      { field: "firstName", headerName: "firstName", width: 140 },
      { field: "lastName", headerName: "LastName", width: 140 },
      { field: "phone", headerName: "phone", width: 140 },
      { field: "email", headerName: "email", width: 140 },
      { field: "type", headerName: "type", width: 140 },
      { field: "gender", headerName: "gender", width: 140 },
      { field: "status", headerName: "status", width: 140 },
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
      <DataGrid
        rows={flatEmployees}
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

export default Employees;
