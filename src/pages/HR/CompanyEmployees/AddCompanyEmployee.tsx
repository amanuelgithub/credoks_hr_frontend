import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { errorToast, successToast } from "../../../utils/toastify";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import { CustomRadio } from "../../../components/form/CustomRadio";

const initialValues: IEmployee = {
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

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  fatherName: yup.string().required("Father Name is required"),
  grandFatherName: yup.string().required("Grand father name is required"),
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
  email: yup
    .string()
    .required("Email is a required")
    .email("Email must be a valid email address"),
  phone: yup.string().required("Phone is a required field"),
  password: yup.string().required("Password is a required field"),
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
  tinNumber: yup.string().required("TIN number is a required field"),
  accountNumber: yup.string().required("Account number is a required field"),
});

// custom radio to use along with formik
// type CustomRadioProps = { label: string } & FieldAttributes<{}>;

// const CustomRadio: React.FC<CustomRadioProps> = ({ label, ...props }) => {
//   const [field] = useField<{}>(props);
//   return <FormControlLabel {...field} control={<Radio />} label={label} />;
// };

function AddCompanyEmployee() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const navigate = useNavigate();

  const [dateOfBirthValue, setDateOfBirthValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );
  const [dateOfJoiningValue, setDateOfJoiningValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );

  const [expanded, setExpanded] = useState<string | false>("panel1");

  const [createEmployee, { isSuccess, isError }] = useAddEmployeeMutation();

  const handleDateOfBirthChange = (newValue: any) => {
    setDateOfBirthValue(newValue);
  };
  const handleDateOfJoiningChange = (newValue: any) => {
    setDateOfJoiningValue(newValue);
  };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    console.log("Date of birth", dateOfBirthValue);
    console.log(
      "Date of Joining",
      typeof dateOfJoiningValue.format("DD/MM/YYYY")
    );
  }, [dateOfBirthValue, dateOfJoiningValue]);

  const handleSubmit = async (values: IEmployee) => {
    try {
      console.log("employee data:", values);

      const employee: IEmployee = {
        ...values,
        companyId,
        dateOfBirth: dateOfBirthValue.toDate(),
        dateOfJoining: dateOfJoiningValue.format("DD/MM/YYYY"),
      };

      await createEmployee({ companyId, employee }).unwrap();

      navigate("/hr-dashboard/employees", {
        state: { message: "employee added successfully" },
      });
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

      <Box className="flex flex-col items-center my-6">
        <Typography variant="h4" component="h4" className="underline">
          Add Employee
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: IEmployee, { setSubmitting }) => {
          setSubmitting(true);

          handleSubmit(values);

          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting }) => (
          <Box component="form" onSubmit={handleSubmit} sx={{ mx: "15%" }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Basic Informations
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* User Type */}
                <FormControl
                  fullWidth
                  margin="normal"
                  size="small"
                  error={touched.type && Boolean(errors.type)}
                >
                  <InputLabel id="user-type-select-label">User Type</InputLabel>
                  <Field
                    name="type"
                    type="select"
                    label="User Type"
                    as={Select}
                    helperText={touched.type && errors.type}
                  >
                    <MenuItem value={UserTypeEnum.ADMIN}>Admin</MenuItem>
                    <MenuItem value={UserTypeEnum.EMPLOYEE}>Employee</MenuItem>
                    <MenuItem value={UserTypeEnum.MANAGER}>Manager</MenuItem>
                    <MenuItem value={UserTypeEnum.HR}>HR</MenuItem>
                  </Field>
                  <FormHelperText>
                    first select the type of user to create
                    {/* {touched.employmentStatus && errors.employmentStatus} */}
                  </FormHelperText>
                </FormControl>

                <Box display="flex" gap={3}>
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
                      touched.grandFatherName && Boolean(errors.grandFatherName)
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

                <Box display="flex" gap={1}>
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
                </Box>

                <Box display="flex" gap={3}>
                  {/* data of Birth */}
                  <FormControl margin="dense" fullWidth size="small">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Date of Birth"
                        inputFormat="MM/DD/YYYY"
                        value={dateOfBirthValue}
                        onChange={handleDateOfBirthChange}
                        renderInput={(params: any) => <TextField {...params} />}
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
                        renderInput={(params: any) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>

                <Box display="flex" gap={3}>
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
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleAccordionChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Payment Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
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
                  error={touched.accountNumber && Boolean(errors.accountNumber)}
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
              </AccordionDetails>
            </Accordion>

            <Button
              sx={{ my: 2 }}
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              size="small"
            >
              Add Employee
            </Button>

            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Box>
        )}
      </Formik>
    </>
  );
}

export default AddCompanyEmployee;
