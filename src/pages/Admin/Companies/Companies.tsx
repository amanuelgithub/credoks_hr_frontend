import React from "react";
import { tableName, rows, columns } from "../../../mocks/companies";
import DataTable, {
  TableRow,
  TableRowCell,
} from "../../../components/DataTable/DataTable";

function Companies() {
  return (
    <div className="flex justify-start">
      <DataTable
        tableName={tableName}
        rows={rows}
        columns={columns}
        addUrl="/admin-dashboard/companies/add"
      >
        {/* all table rows */}
        {rows.map((row) => {
          return (
            <TableRow
              id={row.id}
              editUrl="/admin-dashboard/companies/edit"
              deleteUrl="/admin-dashboard/companies/delete"
            >
              <TableRowCell>{row.name}</TableRowCell>
              <TableRowCell>{row.location}</TableRowCell>
              <TableRowCell>
                <div className="w-5 h-5">
                  <img src={row.companyLogo} alt={row.companyLogo} />
                </div>
              </TableRowCell>
              <TableRowCell>{row.status}</TableRowCell>
            </TableRow>
          );
        })}
      </DataTable>
    </div>
  );
}

export default Companies;
