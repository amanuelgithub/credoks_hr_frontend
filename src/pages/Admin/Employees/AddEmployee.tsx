import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import {
  EmploymentStatusEnum,
  GenderEnum,
  IEmployee,
  MaritalStatusEnum,
  UserTypeEnum,
} from "../../../models/IEmployee";
import * as yup from "yup";
import { Field, Formik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { useAddEmployeeMutation } from "../../../services/employeeApiSlice";
import { ToastContainer } from "react-toastify";
import Divider from "@mui/material/Divider";
import { errorToast, successToast } from "../../../utils/toastify";
import { useGetCompaniesQuery } from "../../../services/companyApiSlice";

// Note: dateOfBirth and dateOfJoining are not validated
// by Formik they are keept in the state and are included
// when submitting the fileds to the createEmployee method
// of the RTK hook function

const employeeInitials: IEmployee = {
  firstName: "",
  fatherName: "",
  grandFatherName: "",
  gender: GenderEnum.MALE,
  // dateOfBirth: undefined,
  type: UserTypeEnum.EMPLOYEE,
  email: "",
  phone: "",
  password: "",
  employmentStatus: EmploymentStatusEnum.CONFIRMED,
  maritalStatus: MaritalStatusEnum.SINGLE,
  // dateOfJoining: undefined,
  tinNumber: "",
  accountNumber: "",
};

const initialValues: any = {
  companyId: "",
  ...employeeInitials,
};

const validationSchema = yup.object({
  companyId: yup.string().required(),
  firstName: yup.string().required(),
  fatherName: yup.string().required(),
  grandFatherName: yup.string().required(),
  gender: yup.mixed().oneOf([GenderEnum.FEMALE, GenderEnum.MALE]),
  // dateOfBirth: yup.date().required(),
  type: yup
    .mixed()
    .oneOf([
      UserTypeEnum.EMPLOYEE,
      UserTypeEnum.MANAGER,
      UserTypeEnum.HR,
      UserTypeEnum.ADMIN,
    ])
    .required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  password: yup.string().required(),
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
  // dateOfJoining: yup.date().required(),
  tinNumber: yup.string().required(),
  accountNumber: yup.string().required(),
});

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

function AddEmployee({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [dateOfBirthValue, setDateOfBirthValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );
  const [dateOfJoiningValue, setDateOfJoiningValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );

  const { data: companies } = useGetCompaniesQuery();

  const [createEmployee, { isSuccess, isError }] = useAddEmployeeMutation();

  const handleDateOfBirthChange = (newValue: any) => {
    setDateOfBirthValue(newValue);
  };
  const handleDateOfJoiningChange = (newValue: any) => {
    setDateOfJoiningValue(newValue);
  };

  useEffect(() => {
    console.log("Date of birth", dateOfBirthValue.format("DD/MM/YYYY"));
  }, [dateOfBirthValue]);

  const handleSubmit = async (values: any) => {
    try {
      console.log("employee data:", values);
      const {
        companyId,
        // employee information
        firstName,
        fatherName,
        grandFatherName,
        gender,
        // dateOfBirth,
        type,
        email,
        phone,
        password,
        employmentStatus,
        maritalStatus,
        // dateOfJoining,
        tinNumber,
        accountNumber,
      } = values;

      const employee: IEmployee = {
        firstName,
        fatherName,
        grandFatherName,
        gender,
        // adding date of birth to the request object
        dateOfBirth: dateOfBirthValue.format("DD/MM/YYYY"),
        type,
        email,
        phone,
        password,
        employmentStatus,
        maritalStatus,
        // adding date of confirmation to the request object
        dateOfJoining: dateOfJoiningValue.format("DD/MM/YYYY"),
        tinNumber,
        accountNumber,
      };

      await createEmployee({ companyId, employee }).unwrap();

      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) successToast("Successfuly Added New Employee.");
    else if (isError) errorToast("Error Creating Employee.");
  }, [isSuccess, isError]);

  return (
    <>
      <ToastContainer />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="flex justify-end">
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon sx={{ fontSize: "36px", color: "gray" }} />
            </IconButton>
          </Box>
          <Box className="flex flex-col items-center my-6">
            <Typography variant="h4" component="h4" className="underline">
              Add Employee
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(
              values: { companyId: string; employee: IEmployee },
              { setSubmitting }
            ) => {
              setSubmitting(true);

              handleSubmit(values);

              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={6} justifyContent="center">
                  <Grid item xs={12} md={5} lg={5}>
                    <Box sx={{ my: 5 }}>
                      <Typography variant="h5" component="h5">
                        Step 1. <span>Basic Informations:</span>
                      </Typography>
                    </Box>

                    {/* User Type */}
                    <FormControl
                      fullWidth
                      margin="normal"
                      size="small"
                      error={touched.type && Boolean(errors.type)}
                    >
                      <InputLabel id="user-type-select-label">
                        User Type
                      </InputLabel>
                      <Field
                        name="type"
                        type="select"
                        label="User Type"
                        as={Select}
                        helperText={touched.type && errors.type}
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
                      <FormHelperText>
                        first select the type of user to create
                        {/* {touched.employmentStatus && errors.employmentStatus} */}
                      </FormHelperText>
                    </FormControl>

                    {/* Company Name */}
                    <FormControl
                      fullWidth
                      margin="normal"
                      size="small"
                      error={touched.companyId && Boolean(errors.companyId)}
                    >
                      <InputLabel id="user-type-select-label">
                        Company
                      </InputLabel>
                      <Field
                        name="companyId"
                        type="select"
                        label="User Type"
                        as={Select}
                        helperText={touched.companyId && errors.companyId}
                      >
                        {companies?.map((company) => (
                          <MenuItem key={company.id} value={company.id}>
                            {company.name}
                          </MenuItem>
                        ))}
                      </Field>
                      <FormHelperText>
                        select the company you want to register this
                        {/* {touched.companyId && errors.companyId} */}
                      </FormHelperText>
                    </FormControl>

                    <Divider sx={{ my: 3 }} />

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

                    {/* gender */}
                    <FormControl fullWidth margin="dense" size="small">
                      <FormLabel id="demo-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="male"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value={GenderEnum.MALE}
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value={GenderEnum.FEMALE}
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>

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

                    {/* password */}
                    <Field
                      name="password"
                      margin="dense"
                      fullWidth
                      type="password"
                      label="Password"
                      placeholder="password"
                      size="small"
                      as={TextField}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />

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

                    {/* data of confirmation date picker */}
                    {/* <FormControl margin="dense" fullWidth size="small">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Confirmation Date"
                          inputFormat="MM/DD/YYYY"
                          value={dateOfConfirmationValue}
                          onChange={handleDateOfConfirmationChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl> */}
                  </Grid>

                  <Grid item xs={12} md={5} lg={5}>
                    <Box sx={{ my: 5 }}>
                      <Typography variant="h5" component="h5">
                        Step 2. <span>Bank Account & TIN Number Details:</span>
                      </Typography>
                    </Box>

                    {/* Account Number */}
                    <Field
                      name="accountNumber"
                      type="text"
                      label="Accound Number"
                      margin="dense"
                      size="small"
                      placeholder="Accound Number"
                      fullWidth
                      as={TextField}
                      error={
                        touched.accountNumber && Boolean(errors.accountNumber)
                      }
                      helperText={touched.accountNumber && errors.accountNumber}
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

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained"
                      size="small"
                    >
                      Add Employee
                    </Button>
                  </Grid>
                </Grid>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default AddEmployee;
