import React, { useEffect, useState } from "react";
import {
  ISalaryRevision,
  SalaryRevisionStatusEnum,
} from "../../../../models/ISalaryRevision";
import * as yup from "yup";
import { Field, Formik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../../../app/hooks";
import { useGetEmployeesByCompanyQuery } from "../../../../services/employeeApiSlice";
import { IEmployee } from "../../../../models/IEmployee";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCreateSalaryRevisionMutation } from "../../../../services/salaryRevisionApiSlice";
import { errorToast, successToast } from "../../../../utils/toastify";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer } from "react-toastify";
import SelectEmployee from "./SelectEmployee";
import EmployeeInfoCard from "./EmployeeInfoCard";

const initialValues: ISalaryRevision = {
  employeeId: "",
  newSalary: undefined,
  revisionStatus: SalaryRevisionStatusEnum.PENDING,
  makerEmployeeId: "",
  makerDate: undefined,
  reasonForRevision: "",
  comments: "",
};

const validationSchema = yup.object({
  newSalary: yup.number().required("Please enter the new salary!"),
  reasonForRevision: yup
    .string()
    .required("Please enter the reason for revision!"),
  comments: yup.string().required("Please enter other comments!"),
});

export function CreateSalaryRevision() {
  const currentDate = new Date();
  const companyId = useAppSelector((state) => state.auth.companyId);
  const makerEmployeeId = useAppSelector((state) => state.auth.sub);

  const { data: employees } = useGetEmployeesByCompanyQuery(companyId);

  const [createSalaryRevision, { isLoading, isError, isSuccess }] =
    useCreateSalaryRevisionMutation();

  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<
    IEmployee | undefined
  >();

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<any>();

  useEffect(() => {
    const selectedEmployee =
      employees &&
      employees.find((employee) => employee.email === selectedEmployeeEmail);

    setSelectedEmployee(selectedEmployee);
  }, [selectedEmployeeEmail, setSelectedEmployeeEmail]);

  useEffect(() => {
    if (isError) {
      errorToast("Error creating salary revision");
    }
    if (isSuccess) {
      successToast("Successfully created salary revision");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    console.log("Form Data Errors: ", formErrors?.data?.message);
  }, [formErrors, setFormErrors]);

  const handleSubmit = async (values: ISalaryRevision) => {
    try {
      const createSalaryRevisionData: ISalaryRevision = {
        employeeId: selectedEmployee?.id,
        makerEmployeeId: makerEmployeeId,
        newSalary: values.newSalary,
        reasonForRevision: values.reasonForRevision,
        revisionStatus: initialValues.revisionStatus,
        comments: values.comments,
      };

      const salaryRevision = await createSalaryRevision({
        employeeId: createSalaryRevisionData.employeeId ?? "",
        salaryRevision: createSalaryRevisionData,
      }).unwrap();

      console.log(`Salary Revision: ${salaryRevision}`);
      navigate("/hr-dashboard/salary-revision/");
    } catch (err: any) {
      console.log("Error: ", err);
      setFormErrors(err);
    }
  };

  const handleSelectedEmployeeEmail = (value: any) => {
    setSelectedEmployeeEmail(value);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="w-full h-screen">
        <h2 className={"text-lg text-gray-500 font-semibold my-2"}>
          Select An Employee
        </h2>
        <div>
          <SelectEmployee
            employees={employees}
            onSelectedEmployeeEmail={handleSelectedEmployeeEmail}
          />
        </div>

        {selectedEmployee && (
          <div>
            <EmployeeInfoCard employee={selectedEmployee} />
          </div>
        )}

        {selectedEmployee && (
          <div className={"bg-white p-4"}>
            <div>
              {formErrors && (
                <div
                  className={
                    "flex justify-between items-center bg-red-400 text-gray-200 text-center text-xs rounded-md py-1 px-2"
                  }
                >
                  <p>Error: {formErrors?.data?.message}</p>
                  <IconButton
                    size="small"
                    sx={{ border: "1px solid gray", bgcolor: "white" }}
                    onClick={() => setFormErrors(undefined)}
                  >
                    <CloseIcon sx={{ fontSize: 12, color: "gray" }} />
                  </IconButton>
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold my-2 text-center">
                  Create Salary Revision
                </h2>

                <Divider sx={{ my: 1 }} />

                <p className="text-end">
                  <span className="font-semibold">Date:</span>
                  {`${currentDate.getMonth() + 1}` +
                    "/" +
                    currentDate.getDate() +
                    "/" +
                    currentDate.getFullYear()}
                </p>
              </div>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ values, errors, touched, isSubmitting, handleSubmit }) => (
                <Box component={"form"} onSubmit={handleSubmit}>
                  <Field
                    name="newSalary"
                    margin="dense"
                    fullWidth
                    label="New Salary Amount"
                    type="number"
                    size="small"
                    as={TextField}
                    error={touched.newSalary && Boolean(errors.newSalary)}
                    helperText={touched.newSalary && errors.newSalary}
                  />

                  <Field
                    name="reasonForRevision"
                    margin="dense"
                    fullWidth
                    label="Reason For Revision"
                    type="number"
                    size="small"
                    multiline={true}
                    rows={3}
                    as={TextField}
                    error={
                      touched.reasonForRevision &&
                      Boolean(errors.reasonForRevision)
                    }
                    helperText={
                      touched.reasonForRevision && errors.reasonForRevision
                    }
                  />

                  <Field
                    name="comments"
                    margin="dense"
                    fullWidth
                    label="Other Comments"
                    type="number"
                    size="small"
                    multiline={true}
                    rows={3}
                    as={TextField}
                    error={touched.comments && Boolean(errors.comments)}
                    helperText={touched.comments && errors.comments}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    size="medium"
                    sx={{ my: 2 }}
                  >
                    Create Revision
                  </Button>
                </Box>
              )}
            </Formik>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
