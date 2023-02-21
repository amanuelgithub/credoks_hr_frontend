// It allows selecting an employee from an auto-complete field
// by using the employee email address
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React from "react";

export default function SelectEmployee({
  employees,
  onSelectedEmployeeEmail,
}: {
  employees: any[] | undefined;
  onSelectedEmployeeEmail: (value: any) => void;
}) {
  return (
    <div>
      <Autocomplete
        freeSolo
        onChange={(event: any, value: any) =>
          onSelectedEmployeeEmail(value || "")
        }
        disableClearable
        options={employees ? employees.map((option) => option.email) : []}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Employee For Salary Revision"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </div>
  );
}
