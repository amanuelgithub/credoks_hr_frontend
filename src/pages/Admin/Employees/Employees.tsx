import React, { useState } from "react";
import { tableName, rows, columns } from "../../../mocks/employees";
import DataTable, {
  TableRow,
  TableRowCell,
} from "../../../components/DataTable/DataTable";
import DetailEmployee from "./DetailEmployee";

function Employees() {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const handleShowDetailOpening = (id: string) => {
    setIsOpenDetail(true);
    setSelectedEmployeeId(id);
    console.log("show detail opened", id);
  };

  return (
    <div>
      <div className={`${isOpenDetail && "flex justify-between w-full"}`}>
        <div className={`${isOpenDetail && "w-8/12"}`}>
          <DataTable
            tableName={tableName}
            rows={rows}
            columns={columns}
            addUrl="/admin-dashboard/employees/add"
          >
            {/* all table rows */}
            {rows.map((row) => {
              return (
                <TableRow
                  id={row.id}
                  editUrl="/admin-dashboard/employees/edit"
                  deleteUrl="/admin-dashboard/employees/delete"
                  showDetail={handleShowDetailOpening}
                >
                  <TableRowCell>{row.firstName}</TableRowCell>
                  <TableRowCell>{row.lastName}</TableRowCell>
                  <TableRowCell>{row.phone}</TableRowCell>
                  <TableRowCell>{row.password}</TableRowCell>
                  <TableRowCell>{row.type}</TableRowCell>
                  <TableRowCell>{row.email}</TableRowCell>
                  <TableRowCell>{row.mobileNumber}</TableRowCell>
                  <TableRowCell>{row.dateOfBirth}</TableRowCell>
                  <TableRowCell>{row.gender}</TableRowCell>
                  <TableRowCell>{row.status}</TableRowCell>
                  <TableRowCell>{row.dateOfJoining}</TableRowCell>
                  <TableRowCell>{row.confirmationDate}</TableRowCell>
                  <TableRowCell>{row.emergencyContactName}</TableRowCell>
                  <TableRowCell>{row.emergencyContactNumber}</TableRowCell>
                  <TableRowCell>{row.fatherName}</TableRowCell>
                  <TableRowCell>{row.spouseName}</TableRowCell>
                  <TableRowCell>{row.accountNumber}</TableRowCell>
                </TableRow>
              );
            })}
          </DataTable>
        </div>
        {isOpenDetail && (
          <div className="w-4/12">
            <DetailEmployee
              // key={}
              showOpenDetail={setIsOpenDetail}
              employeeId={selectedEmployeeId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Employees;
