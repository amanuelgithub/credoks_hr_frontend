import { useEffect, useState } from "react";

import dayjs from "dayjs";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import * as yup from "yup";
import { Field, Formik } from "formik";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IEmployee } from "../../../models/IEmployee";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Divider from "@mui/material/Divider";
import { useAppSelector } from "../../../app/hooks";
import {
  useGetEmployeeQuery,
  useUpdateEmployeeMutation,
} from "../../../services/employeeApiSlice";
import { errorToast, successToast } from "../../../utils/toastify";
import { ToastContainer } from "react-toastify";

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
  dateOfBirth: yup.string(),
  gender: yup.string().required(),
  emergencyContactName: yup.string().required(),
  emergencyContactNumber: yup.string().required(),
  fatherName: yup.string().required(),
  spouseName: yup.string().required(),
  accountNumber: yup.string().required(),
});

function EditProfile({
  editing,
  handleEditing,
}: {
  editing: boolean;
  handleEditing: (editing: boolean) => void;
}) {
  const [dateOfBirthValue, setDateOfBirthValue] = useState(
    dayjs("2014-08-18T21:11:54")
  );
  const [expanded, setExpanded] = useState<string | false>(false);

  const id = useAppSelector((state) => state.auth.sub);
  const { data } = useGetEmployeeQuery(id);

  const [updateProfile, { isSuccess, isError }] = useUpdateEmployeeMutation();

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleDateOfBirthChange = (newValue: any) => {
    setDateOfBirthValue(newValue);
  };

  const handleSubmit = async (values: IEmployee) => {
    console.log("values: ", values);
    try {
      await updateProfile(values).unwrap();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) successToast("Profile successfully updated.");
    else if (isError) errorToast("Error updating profile.");
  }, [isSuccess, isError]);

  return (
    <>
      {data && (
        <div className={`${editing ? "block" : "hidden"}`}>
          <ToastContainer />

          <div className="flex justify-center">
            <Box>
              <div className=" bg-white">
                <IconButton
                  sx={{
                    border: "1px solid",
                    borderColor: "text.secondary",
                    m: 1,
                  }}
                  onClick={() => handleEditing(!editing)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <Formik
                initialValues={data ?? {}}
                validationSchema={validationSchema}
                onSubmit={(values: IEmployee, { setSubmitting }) => {
                  console.log("values", values);
                  setSubmitting(true);
                  handleSubmit(values);
                  setSubmitting(false);
                }}
              >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: 600 }}
                  >
                    {/* Basic Information */}
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

                        {/* gender */}
                        <FormControl fullWidth margin="dense" size="small">
                          <FormLabel
                            sx={{ color: "text.secondary" }}
                            id="demo-radio-buttons-group-label"
                          >
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

                          {/* data of Birth */}
                          <FormControl margin="dense" fullWidth size="small">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DesktopDatePicker
                                label="Date of Birth"
                                inputFormat="MM/DD/YYYY"
                                value={dateOfBirthValue}
                                onChange={handleDateOfBirthChange}
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </LocalizationProvider>
                          </FormControl>
                        </FormControl>

                        {/* Father Name */}
                        <Field
                          name="fatherName"
                          margin="dense"
                          fullWidth
                          label="Father Name"
                          size="small"
                          as={TextField}
                          error={
                            touched.fatherName && Boolean(errors.fatherName)
                          }
                          helperText={touched.fatherName && errors.fatherName}
                        />

                        {/* Spouse Name */}
                        <Field
                          name="spouseName"
                          margin="dense"
                          fullWidth
                          label="Spouse Name"
                          size="small"
                          as={TextField}
                          error={
                            touched.spouseName && Boolean(errors.spouseName)
                          }
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
                      </AccordionDetails>
                    </Accordion>

                    {/* Contact Infomration */}
                    <Accordion
                      expanded={expanded === "panel2"}
                      onChange={handleAccordionChange("panel2")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          Contact Information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
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
                      </AccordionDetails>
                    </Accordion>

                    {/* Password Infomration */}
                    <Accordion
                      expanded={expanded === "panel3"}
                      onChange={handleAccordionChange("panel3")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          Password
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
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
                      </AccordionDetails>
                    </Accordion>

                    {/* Payment Infomration */}
                    <Accordion
                      expanded={expanded === "panel4"}
                      onChange={handleAccordionChange("panel4")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                      >
                        <Typography sx={{ width: "33%", flexShrink: 0 }}>
                          Payment Info
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
                          error={
                            touched.accountNumber &&
                            Boolean(errors.accountNumber)
                          }
                          helperText={
                            touched.accountNumber && errors.accountNumber
                          }
                        />
                      </AccordionDetails>
                    </Accordion>

                    {/* Submit Button */}
                    <div className="flex justify-end items-center bg-white">
                      <Button
                        color="secondary"
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        size="small"
                        sx={{ m: 1 }}
                      >
                        Update
                      </Button>
                    </div>
                  </Box>
                )}
              </Formik>
            </Box>
          </div>

          <Divider sx={{ my: 2 }} />
        </div>
      )}
    </>
  );
}

export default EditProfile;
