import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../../app/hooks";
import ProfileAvatar from "../../../components/ProfileAvatar";
import { IEmployee } from "../../../models/IEmployee";
import {
  useAssignDepartmentHeadMutation,
  useGetDepartmentsOfCompanyQuery,
} from "../../../services/departmentApiSlice";
import Box from "@mui/material/Box";
import { useGetEmployeesByCompanyQuery } from "../../../services/employeeApiSlice";
import { IDepartment } from "../../../models/IDepartment";
import { ToastContainer } from "react-toastify";
import { errorToast, successToast } from "../../../utils/toastify";

function SelectDepartment({
  departments,
  onSelectedDepartmentName,
}: {
  departments: any[] | undefined;
  onSelectedDepartmentName: (value: any) => void;
}) {
  return (
    <div>
      <Autocomplete
        freeSolo
        onChange={(event: any, value: any) =>
          onSelectedDepartmentName(value || "")
        }
        disableClearable
        options={departments ? departments.map((option) => option.name) : []}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Departments"
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

function DepartmentHeadInfo({
  departmentHead,
}: {
  departmentHead: IEmployee | undefined;
}) {
  return (
    <div className="bg-white p-8 my-4 sm:flex sm:justify-between sm:items-center">
      <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-6">
        <ProfileAvatar
          profileImage={`${departmentHead?.profileImage}`}
          width={60}
          height={60}
        />
        <h3>
          {departmentHead?.firstName} {departmentHead?.fatherName}
        </h3>
      </div>

      <p>
        <span className="font-bold">Phone: </span>
        {departmentHead?.phone}
      </p>
      <p>
        <span className="font-bold">Email: </span>
        {departmentHead?.email}
      </p>

      <div>
        <Button
          variant="contained"
          color="warning"
          size="medium"
          // sx={{ borderRadius: 8 }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

function AssignDepartHeadForm({
  employees,
  onSelectedEmployeeEmail,
  onSubmitAssignDepartHead,
}: {
  employees: any[] | undefined;
  onSelectedEmployeeEmail: (value: any) => void;
  onSubmitAssignDepartHead: (evt: any) => void;
}) {
  return (
    <div className="my-12">
      <div className="my-4">
        <p className="text-xs">since department have no assigned-head</p>
        <h2 className="text-lg font-bold">Start By Selecting an Employee</h2>
      </div>

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
              label="Search Employees"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>

      <div className="my-4">
        {/* form */}
        <Box component="form" onSubmit={onSubmitAssignDepartHead}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="medium"
          >
            Save
          </Button>
        </Box>
      </div>
    </div>
  );
}

function AssignDepartHead() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const { data: departments } = useGetDepartmentsOfCompanyQuery(companyId);
  const [selectedDepartmentName, setSelectedDepartmentName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<
    IDepartment | undefined
  >();
  // holds departmentHead(which is an employee) for departments that
  // already has a department head
  const [departmentHead, setDepartmentHead] = useState<IEmployee | undefined>();

  const { data: employees } = useGetEmployeesByCompanyQuery(companyId);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState("");
  // holds employee to assign a role to it.
  const [selectedEmployee, setSelectedEmployee] = useState<
    IEmployee | undefined
  >();

  const [assignDepartmentHead, { isLoading, isSuccess, isError }] =
    useAssignDepartmentHeadMutation();

  useEffect(() => {
    const selectedDepartment =
      departments &&
      departments.find(
        (department) => department.name === selectedDepartmentName
      );

    setSelectedDepartment(selectedDepartment);
    setDepartmentHead(selectedDepartment?.departmentHead);
    // console.log("head: ", selectedDepartment?.departmentHead);
  }, [selectedDepartmentName, setSelectedDepartmentName]);

  useEffect(() => {
    const selectedEmployee =
      employees &&
      employees.find((employee) => employee.email === selectedEmployeeEmail);

    setSelectedEmployee(selectedEmployee);
    // console.log("emp: ", selectedEmployeeEmail);
  }, [selectedEmployeeEmail, setSelectedEmployeeEmail]);

  useEffect(() => {
    if (isSuccess) {
      successToast("Successfully assigned a head for department!");
    }
  }, [isLoading, isSuccess, isError]);

  const handleSelectedDepartmentName = (value: any) => {
    setSelectedDepartmentName(value);
  };

  const handleSelectedEmployeeEmail = (value: any) => {
    setSelectedEmployeeEmail(value);
  };

  const handleSubmitAssignDepartHead = async (e: any) => {
    e.preventDefault();

    const departmentId = selectedDepartment?.id ?? "";
    const employeeId = selectedEmployee?.id ?? "";

    if (!departmentId || !employeeId) {
      errorToast(
        "Please select department and employee before trying to assign a new depart head"
      );
    }

    const formData = {
      departmentId,
      employeeId,
      isDepartmentHead: true,
    };

    try {
      await assignDepartmentHead({ body: formData }).unwrap();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="h-screen">
      <ToastContainer />

      <div>
        <h1 className="text-2xl font-semibold text-center">
          Assign Department Head
        </h1>
        <hr className="bg-gray-200 my-8" />
        <div>
          <SelectDepartment
            departments={departments}
            onSelectedDepartmentName={handleSelectedDepartmentName}
          />
        </div>

        {/* department head info */}
        {selectedDepartmentName && departmentHead && (
          <DepartmentHeadInfo departmentHead={departmentHead} />
        )}

        {/* assign a new Department head */}
        {selectedDepartmentName && !departmentHead && (
          <AssignDepartHeadForm
            employees={employees}
            onSelectedEmployeeEmail={handleSelectedEmployeeEmail}
            onSubmitAssignDepartHead={handleSubmitAssignDepartHead}
          />
        )}
      </div>
    </div>
  );
}

export default AssignDepartHead;
