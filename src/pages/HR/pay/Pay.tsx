import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { IEmployee } from "../../../models/IEmployee";
import { IPay } from "../../../models/IPay";
import { useFindAllPayByPayrollIdQuery } from "../../../services/payApiSlice";
import Breadcrumbs from "../../../components/Breadcrumbs";

interface IEmployeePay extends IPay, IEmployee {}

type Row = IEmployeePay;

let initialPays: IPay[] = [];

function Pay() {
  const { payrollId } = useParams();

  const [pays, setPays] = useState(initialPays);
  const { data } = useFindAllPayByPayrollIdQuery(payrollId ?? "");

  const navigate = useNavigate();

  useEffect(() => {
    setPays(data ?? []);

    console.log("Pays::::", data ? data[0]?.id : undefined);
  }, [data]);

  const handleViewPayslipFieldAction = React.useCallback(
    (id: GridRowId) => () => {
      navigate(`/pay/${id}/generate-payslip`);
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: "id", headerName: "#ID", width: 60 },
      { field: "payrollId", headerName: "Payroll ID", width: 120 },
      {
        field: "firstName",
        headerName: "First Name",
        width: 120,
        valueGetter: (tableData) => tableData.row.employee.firstName,
      },
      {
        field: "fatherName",
        headerName: "Father Name",
        width: 120,
        valueGetter: (tableData) => tableData.row.employee.fatherName,
      },
      {
        field: "salary",
        headerName: "Salary",
        width: 120,
        valueGetter: (tableData) => tableData.row.employee.salary,
      },
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

      {
        field: "actions",
        type: "actions",
        width: 200,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<PrintIcon color="info" />}
            label="Payslip"
            onClick={handleViewPayslipFieldAction(params.id)}
          />,
          // <GridActionsCellItem
          //   icon={<DownloadIcon sx={{ color: "secondary.main" }} />}
          //   label="Download"
          //   onClick={handleViewPayslipFieldAction(params.id)}
          // />,
        ],
      },
    ],
    [handleViewPayslipFieldAction]
  );

  return (
    <div className="h-screen">
      {/* <Breadcrumbs /> */}

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
