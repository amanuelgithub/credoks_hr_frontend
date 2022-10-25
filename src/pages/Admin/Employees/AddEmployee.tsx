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
import { EmployeeStatusEnum, IEmployee } from "../../../models/IEmployee";
import * as yup from "yup";
import { GenderEnum, UserTypeEnum } from "../../../models/IUser";
import { Field, Formik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { useAddEmployeeMutation } from "../../../services/employeeApiSlice";
import { toast, ToastContainer } from "react-toastify";
import Divider from "@mui/material/Divider";

const initialValues: IEmployee = {
  // user fields
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  type: UserTypeEnum.EMPLOYEE,
  dateOfBirth: "",
  gender: GenderEnum.MALE,
  // employee fields
  status: EmployeeStatusEnum.PROBAATION,
  dateOfJoining: "",
  confirmationDate: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  fatherName: "",
  spouseName: "",
  accountNumber: "",
};

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
  password: yup.string().required(),
  type: yup
    .mixed()
    .oneOf([UserTypeEnum.EMPLOYEE, UserTypeEnum.MANAGER, UserTypeEnum.HR])
    .required(),
  dateOfBirth: yup.string(),
  gender: yup.string().required(),
  status: yup
    .mixed()
    .oneOf([
      EmployeeStatusEnum.PROBAATION,
      EmployeeStatusEnum.TRAINEE,
      EmployeeStatusEnum.CONTRACT,
      EmployeeStatusEnum.CONFIRMED,
    ])
    .required(),
  dateOfJoining: yup.string(),
  confirmationDate: yup.string(),
  emergencyContactName: yup.string().required(),
  emergencyContactNumber: yup.string().required(),
  fatherName: yup.string().required(),
  spouseName: yup.string().required(),
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
  const [dateOfConfirmationValue, setDateOfConfirmationValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );

  const [createEmployee, { isLoading, isSuccess, isError }] =
    useAddEmployeeMutation();

  const handleDateOfBirthChange = (newValue: any) => {
    setDateOfBirthValue(newValue);
  };
  const handleDateOfJoiningChange = (newValue: any) => {
    setDateOfJoiningValue(newValue);
  };
  const handleDateOfConfirmationChange = (newValue: any) => {
    setDateOfConfirmationValue(newValue);
  };

  const handleSubmit = async (values: IEmployee) => {
    try {
      await createEmployee(values).unwrap();
      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess)
      toast.success("Successfuly Added New Employee.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    else if (isError)
      toast.error("Error Creating Employee.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
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
            onSubmit={(values: IEmployee, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
              setTimeout(() => {
                alert(`${JSON.stringify(values, null, 2)}`);
              }, 400);
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={6} justifyContent="center">
                  <Grid item xs={12} md={4} lg={5}>
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
                      >
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
                        {touched.status && errors.status}
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

                    {/* Last Name */}
                    <Field
                      name="lastName"
                      margin="dense"
                      fullWidth
                      label="Last Name"
                      size="small"
                      type="text"
                      as={TextField}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />

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
                    <div>
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
                      <div className="flex justify-between">
                        <Button size="small" variant="contained">
                          Generate Password
                        </Button>
                        <p>afka24343!@#4</p>
                      </div>
                    </div>

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
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>

                    {/* data of Birth */}
                    <FormControl margin="dense" fullWidth size="small">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Date of Birth"
                          inputFormat="MM/DD/YYYY"
                          value={dateOfBirthValue}
                          onChange={handleDateOfBirthChange}
                          renderInput={(params) => <TextField {...params} />}
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
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    {/* Employee Status */}
                    <FormControl
                      fullWidth
                      margin="normal"
                      size="small"
                      error={touched.status && Boolean(errors.status)}
                    >
                      <InputLabel id="employee-status-select-label">
                        Employee Status
                      </InputLabel>
                      <Field
                        name="status"
                        type="select"
                        label="Employee Status"
                        as={Select}
                      >
                        <MenuItem value={EmployeeStatusEnum.TRAINEE}>
                          Trainee
                        </MenuItem>
                        <MenuItem value={EmployeeStatusEnum.PROBAATION}>
                          Probation
                        </MenuItem>
                        <MenuItem value={EmployeeStatusEnum.CONTRACT}>
                          Contract
                        </MenuItem>
                        <MenuItem value={EmployeeStatusEnum.CONFIRMED}>
                          Confirmed
                        </MenuItem>
                      </Field>
                      <FormHelperText>
                        {touched.status && errors.status}
                      </FormHelperText>
                    </FormControl>

                    {/* data of confirmation date picker */}
                    <FormControl margin="dense" fullWidth size="small">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Confirmation Date"
                          inputFormat="MM/DD/YYYY"
                          value={dateOfConfirmationValue}
                          onChange={handleDateOfConfirmationChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </FormControl>

                    {/* Father Name */}
                    <Field
                      name="fatherName"
                      margin="dense"
                      fullWidth
                      label="Father Name"
                      size="small"
                      as={TextField}
                      error={touched.fatherName && Boolean(errors.fatherName)}
                      helperText={touched.fatherName && errors.fatherName}
                    />

                    {/* Spouse Name */}
                    <Field
                      name="spouseName"
                      margin="dense"
                      fullWidth
                      label="Spouse Namekkkkkkkk"
                      size="small"
                      as={TextField}
                      error={touched.spouseName && Boolean(errors.spouseName)}
                      helperText={touched.spouseName && errors.spouseName}
                    />

                    {/* Emergency Contact Name */}
                    <Field
                      name="emergencyContactName"
                      margin="dense"
                      fullWidth
                      label="Emergency Contact Name"
                      size="small"
                      as={TextField}
                      error={
                        touched.emergencyContactName &&
                        Boolean(errors.emergencyContactName)
                      }
                      helperText={
                        touched.emergencyContactName &&
                        errors.emergencyContactName
                      }
                    />

                    {/* Emergency Contact Number */}
                    <Field
                      name="emergencyContactNumber"
                      margin="dense"
                      fullWidth
                      label="Emergency Contact Number"
                      size="small"
                      as={TextField}
                      error={
                        touched.emergencyContactNumber &&
                        Boolean(errors.emergencyContactNumber)
                      }
                      helperText={
                        touched.emergencyContactNumber &&
                        errors.emergencyContactNumber
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={8} lg={5}>
                    <Box sx={{ my: 5 }}>
                      <Typography variant="h5" component="h5">
                        Step 2. <span>Payment Method:</span>
                      </Typography>
                    </Box>

                    {/* Payment Methods */}
                    <FormControl fullWidth margin="dense" size="small">
                      <InputLabel id="payment-methods-select-label">
                        Payment Methods
                      </InputLabel>
                      <Select
                        labelId="payment-methods-select-label"
                        id="payment-method"
                        // value={status}
                        label="Payment Method"
                        // onChange={handleChange}
                      >
                        <MenuItem value={10}>Bank Transfer</MenuItem>
                        <MenuItem value={20}>Cash</MenuItem>
                      </Select>
                    </FormControl>

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

                    <TextField
                      type="number"
                      margin="dense"
                      size="small"
                      fullWidth
                      label="TIN Number"
                      placeholder="TIN Number"
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
                {/* <div>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </div>
                <div>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </div> */}
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default AddEmployee;