import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  renderActionsCell,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreIcon from "@mui/icons-material/More";
import { IPayroll } from "../../../models/IPayroll";
import { useFindAllPayrollsQuery } from "../../../services/payrollApiSlice";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Row = IPayroll;

let initialPayrolls: any[] = [];

function Payrolls() {
  const [payrolls, setPayrolls] = useState(initialPayrolls);
  const { data } = useFindAllPayrollsQuery();

  useEffect(() => {
    setPayrolls(data ?? []);
  }, [data]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "#ID", width: 60 },
      {
        field: "month",
        headerName: "Month",
        width: 100,
      },
      {
        field: "year",
        headerName: "Year",
        width: 100,
      },
      { field: "totalNetPaid", headerName: "Total Paid Money", width: 140 },
      { field: "totalTaxPaid", headerName: "Total Tax Paid", width: 140 },
      { field: "totalDeduction", headerName: "Total Decuction", width: 140 },
      {
        field: "totalPaid",
        headerName: "Total Paid",
        width: 140,
      },
      {
        field: "totalEmployeesPaid",
        headerName: "Total No of Employees Paid",
        width: 200,
      },
      {
        field: "actions",
        type: "actions",
        width: 200,
        renderCell: (params) => {
          return (
            <Link
              to={`/hr-dashboard/pay/${params.row.id}`}
              className="hover:underline text-white bg-green-500 px-1 rounded-full text-xs"
            >
              view all paid employees list
            </Link>
          );
        },
        // getActions: (params) => [
        //   <GridActionsCellItem
        //     icon={<MoreIcon color="info" />}
        //     label="Detail"
        //     // onClick={handleMoreEmployeeFieldAction(params.id)}
        //   />,
        //   <GridActionsCellItem
        //     icon={<EditIcon sx={{ color: "secondary.main" }} />}
        //     label="Edit"
        //     // onClick={handleEditEmployeeFieldAction(params.id)}
        //   />,
        //   <GridActionsCellItem
        //     icon={<DeleteIcon color="warning" />}
        //     label="Delete"
        //     // onClick={handleDeleteEmployeeFieldAction(params.id)}
        //   />,
        // ],
      },
    ],
    [
      //   handleMoreEmployeeFieldAction,
      //   handleDeleteEmployeeFieldAction,
      //   handleEditEmployeeFieldAction,
    ]
  );

  return (
    <div>
      <DataGrid
        rows={payrolls}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 30, 40]}
        autoHeight
        loading={false}
        error={undefined}
        isRowSelectable={(_params) => false}
      />
    </div>
  );
}

export default Payrolls;
