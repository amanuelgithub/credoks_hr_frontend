import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Field, Formik } from "formik";
import Modal from "@mui/material/Modal";
import { ToastContainer } from "react-toastify";
import {
  EmploymentStatusEnum,
  GenderEnum,
  IEmployee,
  MaritalStatusEnum,
  UserTypeEnum,
} from "../../../models/IEmployee";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import { Divider } from "@mui/material";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../../services/employeeApiSlice";
import { errorToast, successToast } from "../../../utils/toastify";
import { CustomRadio } from "../../../components/form/CustomRadio";
import { useGetCompaniesQuery } from "../../../services/companyApiSlice";

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const validationSchema = yup.object({
  companyId: yup.string().required(),
  firstName: yup.string().required("First name is a required field"),
  fatherName: yup.string().required("Father name is a required field"),
  grandFatherName: yup
    .string()
    .required("Grandfather name is a required field"),
  gender: yup.mixed().oneOf([GenderEnum.FEMALE, GenderEnum.MALE]),
  dateOfBirth: yup.date(),
  type: yup
    .mixed()
    .oneOf([
      UserTypeEnum.EMPLOYEE,
      UserTypeEnum.MANAGER,
      UserTypeEnum.HR,
      UserTypeEnum.ADMIN,
    ])
    .required(),
  email: yup.string().required().email("Email is a required field"),
  phone: yup.string().required("Phone is a required field"),
  employmentStatus: yup
    .mixed()
    .oneOf([
      EmploymentStatusEnum.PROBAATION,
      EmploymentStatusEnum.TRAINEE,
      EmploymentStatusEnum.CONTRACT,
      EmploymentStatusEnum.CONFIRMED,
    ])
    .required(),
  maritalStatus: yup
    .mixed()
    .oneOf([
      MaritalStatusEnum.SINGLE,
      MaritalStatusEnum.DIVORCED,
      MaritalStatusEnum.MARRIED,
    ])
    .required(),
  // dateOfJoining: yup.date(),
  tinNumber: yup.string().required("Tin Number is a required field"),
  bankName: yup.string().required("Bank Name is required fields"),
  bankAccountNumber: yup
    .string()
    .required("Bank Account Number is required fields"),
});

function EditEmployee({
  id,
  openModal,
  handleCloseModal,
}: {
  id: string;
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [dateOfBirthValue, setDateOfBirthValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );
  const [dateOfJoiningValue, setDateOfJoiningValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );

  const { data: employee } = useGetEmployeeQuery(id);

  const { data: companies } = useGetCompaniesQuery();

  const [updateEmployee, { isSuccess, isError }] = useUpdateEmployeeMutation();

  const handleDateOfBirthChange = (newValue: any) => {
    setDateOfBirthValue(newValue);
  };
  const handleDateOfJoiningChange = (newValue: any) => {
    setDateOfJoiningValue(newValue);
  };

  const handleSubmit = async (values: IEmployee) => {
    try {
      await updateEmployee(values).unwrap();

      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    setDateOfBirthValue(dayjs(employee?.dateOfBirth ?? ""));
    setDateOfJoiningValue(dayjs(employee?.dateOfJoining ?? ""));

    console.log("edit emp data: ", employee);
  }, [employee]);

  useEffect(() => {
    if (isSuccess) successToast("Successfuly Updated Employee.");
    else if (isError) errorToast("Error Creating Employee.");
  }, [isSuccess, isError]);

  return (
    <>
      {employee && (
        <>
          <ToastContainer />

          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box className="flex justify-between mb-10">
                <Box />
                <Typography variant="h5" className="underline">
                  Edit Employee
                </Typography>
                <IconButton size="small" onClick={handleCloseModal}>
                  <CloseIcon sx={{ color: "gray" }} />
                </IconButton>
              </Box>
              <Formik
                initialValues={employee}
                validationSchema={validationSchema}
                onSubmit={(values: IEmployee, { setSubmitting }) => {
                  setSubmitting(true);
                  handleSubmit(values);
                  setSubmitting(false);
                }}
              >
                {({ values, errors, touched, handleSubmit, isSubmitting }) => (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box marginY={2}>
                      <Typography>
                        Step 1. <span>Basic Personal Informations:</span>
                      </Typography>
                      <Divider />
                    </Box>

                    <Box display="flex" gap={3}>
                      {/* User Type */}
                      <FormControl
                        disabled
                        fullWidth
                        margin="normal"
                        size="small"
                      >
                        <InputLabel id="user-type-select-label">
                          User Type
                        </InputLabel>
                        <Field
                          name="type"
                          type="select"
                          label="User Type"
                          as={Select}
                        >
                          <MenuItem value={UserTypeEnum.ADMIN}>Admin</MenuItem>
                          <MenuItem value={UserTypeEnum.EMPLOYEE}>
                            Employee
                          </MenuItem>
                          <MenuItem value={UserTypeEnum.MANAGER}>
                            Manager
                          </MenuItem>
                          <MenuItem value={UserTypeEnum.HR}>HR</MenuItem>
                        </Field>
                      </FormControl>

                      {/* Company Name */}
                      <FormControl
                        disabled
                        fullWidth
                        margin="normal"
                        size="small"
                      >
                        <InputLabel id="user-type-select-label">
                          Company
                        </InputLabel>
                        <Field
                          name="companyId"
                          type="select"
                          label="User Type"
                          as={Select}
                        >
                          {companies?.map((company) => (
                            <MenuItem key={company.id} value={company.id}>
                              {company.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </FormControl>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box marginY={2} display="flex" gap={2}>
                      {/* First Name */}
                      <Field
                        name="firstName"
                        margin="dense"
                        fullWidth
                        label="First Name"
                        type="text"
                        size="small"
                        as={TextField}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                      />

                      {/* Father Name */}
                      <Field
                        name="fatherName"
                        margin="dense"
                        fullWidth
                        label="Father Name"
                        size="small"
                        type="text"
                        as={TextField}
                        error={touched.fatherName && Boolean(errors.fatherName)}
                        helperText={touched.fatherName && errors.fatherName}
                      />

                      {/* Grand Father Name */}
                      <Field
                        name="grandFatherName"
                        margin="dense"
                        fullWidth
                        label="Grand Father Name"
                        size="small"
                        as={TextField}
                        error={
                          touched.grandFatherName &&
                          Boolean(errors.grandFatherName)
                        }
                        helperText={
                          touched.grandFatherName && errors.grandFatherName
                        }
                      />
                    </Box>

                    {/* gender */}
                    <FormControl fullWidth margin="dense" size="small">
                      <FormLabel id="demo-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={GenderEnum.MALE}
                        name="gender"
                      >
                        <Box display="flex">
                          <CustomRadio
                            name="gender"
                            type="radio"
                            value={GenderEnum.MALE}
                            label="Male"
                          />
                          <CustomRadio
                            name="gender"
                            type="radio"
                            value={GenderEnum.FEMALE}
                            label="Female"
                          />
                        </Box>
                      </RadioGroup>
                    </FormControl>

                    <Box marginY={2} display="flex" gap={1}>
                      {/* Email */}
                      <Field
                        name="email"
                        margin="dense"
                        fullWidth
                        label="Email"
                        size="small"
                        type="text"
                        as={TextField}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />

                      {/* Phone */}
                      <Field
                        name="phone"
                        margin="dense"
                        fullWidth
                        label="Phone"
                        size="small"
                        type="text"
                        as={TextField}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                    </Box>

                    <Box marginY={2} display="flex" gap={3}>
                      {/* data of Birth */}
                      <FormControl margin="dense" fullWidth size="small">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="MM/DD/YYYY"
                            value={dateOfBirthValue}
                            onChange={handleDateOfBirthChange}
                            renderInput={(params: any) => (
                              <TextField {...params} />
                            )}
                          />
                        </LocalizationProvider>
                      </FormControl>

                      {/* data of joining date picker */}
                      <FormControl margin="dense" fullWidth size="small">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                            label="Joining Date"
                            inputFormat="MM/DD/YYYY"
                            value={dateOfJoiningValue}
                            onChange={handleDateOfJoiningChange}
                            renderInput={(params: any) => (
                              <TextField {...params} />
                            )}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Box>

                    <Box marginY={2} display="flex" gap={3}>
                      {/* Employee Status */}
                      <FormControl
                        fullWidth
                        margin="normal"
                        size="small"
                        error={
                          touched.employmentStatus &&
                          Boolean(errors.employmentStatus)
                        }
                      >
                        <InputLabel id="employee-status-select-label">
                          Employee Status
                        </InputLabel>
                        <Field
                          name="employmentStatus"
                          type="select"
                          label="Employee Status"
                          as={Select}
                        >
                          <MenuItem value={EmploymentStatusEnum.TRAINEE}>
                            Trainee
                          </MenuItem>
                          <MenuItem value={EmploymentStatusEnum.PROBAATION}>
                            Probation
                          </MenuItem>
                          <MenuItem value={EmploymentStatusEnum.CONTRACT}>
                            Contract
                          </MenuItem>
                          <MenuItem value={EmploymentStatusEnum.CONFIRMED}>
                            Confirmed
                          </MenuItem>
                        </Field>
                        <FormHelperText>
                          {/* {touched.employmentStatus && errors.employmentStatus} */}
                        </FormHelperText>
                      </FormControl>

                      {/* Marital Status */}
                      <FormControl
                        fullWidth
                        margin="normal"
                        size="small"
                        error={
                          touched.maritalStatus && Boolean(errors.maritalStatus)
                        }
                      >
                        <InputLabel id="marital-status-select-label">
                          Marital Status
                        </InputLabel>
                        <Field
                          name="maritalStatus"
                          type="select"
                          label="Marital Status"
                          as={Select}
                        >
                          <MenuItem value={MaritalStatusEnum.DIVORCED}>
                            Divorced
                          </MenuItem>
                          <MenuItem value={MaritalStatusEnum.MARRIED}>
                            Married
                          </MenuItem>
                          <MenuItem value={MaritalStatusEnum.SINGLE}>
                            Single
                          </MenuItem>
                        </Field>
                        {/* <FormHelperText>
                        {touched.maritalStatus && errors.maritalStatus}
                      </FormHelperText> */}
                      </FormControl>
                    </Box>

                    <Box marginY={2}>
                      <Typography>
                        Step 2. <span>Bank Account & TIN Number Details:</span>
                      </Typography>
                      <Divider />
                    </Box>

                    <Box display="flex" gap={3} marginY={2}>
                      <Field
                        name="bankName"
                        type="text"
                        label="bankName"
                        margin="dense"
                        size="small"
                        placeholder="bankName"
                        fullWidth
                        as={TextField}
                        error={touched.bankName && Boolean(errors.bankName)}
                        helperText={touched.bankName && errors.bankName}
                      />

                      {/* Account Number */}
                      <Field
                        name="bankAccountNumber"
                        type="text"
                        label="Accound Number"
                        margin="dense"
                        size="small"
                        placeholder="Accound Number"
                        fullWidth
                        as={TextField}
                        error={
                          touched.bankAccountNumber &&
                          Boolean(errors.bankAccountNumber)
                        }
                        helperText={
                          touched.bankAccountNumber && errors.bankAccountNumber
                        }
                      />

                      {/* TIM Number */}
                      <Field
                        name="tinNumber"
                        type="text"
                        label="TIN Number"
                        margin="dense"
                        size="small"
                        placeholder="TIN Number"
                        fullWidth
                        as={TextField}
                        error={touched.tinNumber && Boolean(errors.tinNumber)}
                        helperText={touched.tinNumber && errors.tinNumber}
                      />
                    </Box>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained"
                      size="small"
                    >
                      Update Employee
                    </Button>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  </Box>
                )}
              </Formik>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default EditEmployee;
