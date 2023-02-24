import React, { useEffect, useState } from "react";
import { GridColumns } from "@mui/x-data-grid";
import { StripedDataGrid } from "../../../components/StripedDataGrid";
import DataGridToolbar from "../../../components/DataGridToolbar";
import { useGetSalaryRevisionsQuery } from "../../../services/salaryRevisionApiSlice";
import Typography from "@mui/material/Typography";
import {
  ISalaryRevision,
  SalaryRevisionStatusEnum,
} from "../../../models/ISalaryRevision";
import SalaryRevisionCard from "../../../components/SalaryRevisionCard";
import { FormControl, MenuItem, Select } from "@mui/material";

const initialSalaryRevisions: any[] = [];

export default function SalaryRevisions() {
  // const companyId = useAppSelector((state) => state.auth.companyId);
  const [salaryRevisions, setSalaryRevisions] = useState(
    initialSalaryRevisions
  );
  const { data, isSuccess } = useGetSalaryRevisionsQuery();

  const [selectedSalaryRevisionId, setSelectedSalaryRevisionId] = useState();
  const [selectedSalaryRevision, setSelectedSalaryRevision] = useState<
    ISalaryRevision | undefined
  >();

  useEffect(() => {
    if (isSuccess) {
      setSalaryRevisions(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (salaryRevisions) {
      const selectedRevision: ISalaryRevision = salaryRevisions.find(
        (revision) => revision.id === selectedSalaryRevisionId
      );
      setSelectedSalaryRevision(selectedRevision);
    }
  }, [selectedSalaryRevisionId, setSelectedSalaryRevisionId]);

  const handleCloseSalaryRevisionCard = () => {
    setSelectedSalaryRevisionId(undefined);
    setSelectedSalaryRevision(undefined);
  };

  const handleSalaryRevisionChange = (e: any, salRevId: string) => {
    e.preventDefault();

    // TODO: UPDATE SALARY OF AN EMPLOYEE
  };

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
              {/*<p*/}
              {/*  className={`${*/}
              {/*    params.row.revisionStatus === SalaryRevisionStatusEnum.PENDING*/}
              {/*      ? "bg-blue-500"*/}
              {/*      : params.row.revisionStatus ===*/}
              {/*        SalaryRevisionStatusEnum.APPROVED*/}
              {/*      ? "bg-green-500"*/}
              {/*      : "bg-red-500"*/}
              {/*  } px-2 text-xs text-white rounded-full border border-gray-700`}*/}
              {/*>*/}
              {/*  {params.row.revisionStatus}*/}
              {/*</p>*/}

              <FormControl fullWidth margin="normal" size="small">
                <Select
                  defaultValue={params.row?.revisionStatus}
                  name="revisionStatus"
                  type="select"
                  label="Revistion Status"
                  sx={{
                    // bgcolor: `primary.main`,
                    // color: "white",
                    borderRadius: 8,
                    border: "1px solid gray",
                  }}
                  className={`${
                    params.row.revisionStatus ===
                    SalaryRevisionStatusEnum.PENDING
                      ? "bg-blue-500"
                      : params.row.revisionStatus ===
                        SalaryRevisionStatusEnum.APPROVED
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  value={undefined}
                  onChange={(e: any) =>
                    handleSalaryRevisionChange(e, params.row.id ?? "")
                  }
                >
                  <MenuItem value={SalaryRevisionStatusEnum.PENDING}>
                    {SalaryRevisionStatusEnum.PENDING}
                  </MenuItem>
                  <MenuItem value={SalaryRevisionStatusEnum.APPROVED}>
                    {SalaryRevisionStatusEnum.APPROVED}
                  </MenuItem>
                  <MenuItem value={SalaryRevisionStatusEnum.DECLINED}>
                    {SalaryRevisionStatusEnum.DECLINED}
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Salary Revisions
      </Typography>

      <div className="flex gap-2">
        <div className={`${selectedSalaryRevision ? "w-2/3 " : "w-full"}`}>
          <StripedDataGrid
            rows={salaryRevisions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoHeight
            density={"compact"}
            rowHeight={75}
            disableExtendRowFullWidth={true}
            scrollbarSize={200}
            loading={false}
            error={undefined}
            onSelectionModelChange={(data: any) => {
              console.log(typeof data[0]);
              setSelectedSalaryRevisionId(data[0]); // for a single-selection
            }}
            // isRowSelectable={(_params) => false}
            components={{
              Toolbar: DataGridToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </div>

        <div
          className={`${
            selectedSalaryRevision ? "block" : "hidden"
          } w-1/3 bg-white`}
        >
          <SalaryRevisionCard
            salaryRevision={selectedSalaryRevision}
            onCloseSalaryRevisionCard={handleCloseSalaryRevisionCard}
          />
        </div>
      </div>
    </div>
  );
}
