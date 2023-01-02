import { DataGrid, GridColumns } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPay } from "../../../models/IPay";
import { useFindAllPayByPayrollIdQuery } from "../../../services/payApiSlice";

type Row = IPay;

let initialPays: IPay[] = [];

function Pay() {
  const { payrollId } = useParams();

  const [pays, setPays] = useState(initialPays);
  const { data } = useFindAllPayByPayrollIdQuery(payrollId ?? "");

  useEffect(() => {
    setPays(data ?? []);
  }, [data]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "#ID", width: 60 },
      { field: "payrollId", headerName: "Payroll ID", width: 120 },
      {
        field: "netPay",
        headerName: "Net Paid",
        width: 130,
      },
      {
        field: "deduction",
        headerName: "Deduction",
        width: 130,
      },
      { field: "salaryIncomeTax", headerName: "Income Tax", width: 130 },
      { field: "employeePension", headerName: "Employee Pension", width: 130 },
      {
        field: "year",
        headerName: "Year",
        width: 130,
      },
      {
        field: "month",
        headerName: "Month",
        width: 130,
      },
    ],
    []
  );

  return (
    <div className="h-screen">
      <DataGrid
        rows={pays}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
        autoHeight
        loading={false}
        error={undefined}
        isRowSelectable={(_params) => false}
      />
    </div>
  );
}

export default Pay;
