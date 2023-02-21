import React, { useEffect } from "react";
import { GridColumns } from "@mui/x-data-grid";
import { StripedDataGrid } from "./StripedDataGrid";
import DataGridToolbar from "./DataGridToolbar";
import { useGetEmployeeSalaryRevisionsQuery } from "../services/salaryRevisionApiSlice";
import { useParams } from "react-router-dom";
import { SalaryRevisionStatusEnum } from "../models/ISalaryRevision";
import Typography from "@mui/material/Typography";

export function EmpSalaryRevisions() {
  const params = useParams();
  const { employeeId } = params;
  const { data: employeeSalaryRevisions, isSuccess } =
    useGetEmployeeSalaryRevisionsQuery(employeeId ?? "");

  useEffect(() => {
    console.log(
      "Sal revision: ",
      employeeSalaryRevisions,
      "params: ",
      employeeId
    );
  }, [isSuccess]);

  const columns = React.useMemo<GridColumns<any>>(
    () => [
      { field: "id", headerName: "#ID", width: 80 },
      { field: "employeeId", headerName: "Emp ID", width: 80 },
      { field: "makerEmployeeId", headerName: "Maker Emp ID", width: 80 },
      { field: "checkerEmployeeId", headerName: "Checker Emp ID", width: 80 },
      { field: "newSalary", headerName: "Revision Salary Amount", width: 120 },
      { field: "reasonForRevision", headerName: "Revision Reason", width: 120 },
      { field: "comments", headerName: "Other Comments", width: 140 },
      {
        field: "revisionStatus",
        headerName: "Salary Revision Status",
        width: 140,
        renderCell: (params) => {
          return (
            <>
              <p
                className={`${
                  params.row.revisionStatus === SalaryRevisionStatusEnum.PENDING
                    ? "bg-blue-500"
                    : params.row.revisionStatus ===
                      SalaryRevisionStatusEnum.APPROVED
                    ? "bg-green-500"
                    : "bg-red-500"
                } px-2 text-xs text-white rounded-full border border-gray-700`}
              >
                {params.row.revisionStatus}
              </p>
            </>
          );
        },
      },
    ],
    []
  );
  return (
    <div>
      <div className={"my-8"}>
        <Typography variant="h5">
          Salary Revisions For:{" "}
          <span className={"text-sm bg-green-200 p-1 rounded-md"}>
            Employee ID: {employeeId}
          </span>
        </Typography>
      </div>

      <StripedDataGrid
        rows={employeeSalaryRevisions ?? []}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        rowHeight={75}
        loading={false}
        error={undefined}
        isRowSelectable={(_params) => false}
        components={{
          Toolbar: DataGridToolbar,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
      />
    </div>
  );
}
