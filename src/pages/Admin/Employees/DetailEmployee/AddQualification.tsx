import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { IQualification } from "../../../../models/IQualification";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAddQaualificationMutation } from "../../../../services/qualificationApiSlice";

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const initialValues: IQualification = {
  employeeId: "",
  education: "",
  school: "",
  educationStartedYear: new Date(Date.now()),
  educationEndedYear: new Date(Date.now()),
};

const validationSchema = yup.object({
  education: yup.string().required(),
  school: yup.string().required(),
});

function AddQualification({
  employeeId,
  openModal,
  handleCloseModal,
}: {
  employeeId: string;
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [startingDate, setStartingDate] = useState(
    dayjs(new Date(Date.now()).toString())
  );
  const [endingDate, setEndingDate] = useState(
    dayjs(new Date(Date.now()).toString())
  );

  const [createQualification, { isSuccess, isError }] =
    useAddQaualificationMutation();

  const handleStartingDateChange = (newValue: any) => {
    setStartingDate(newValue);
  };

  const handleEndingDateChange = (newValue: any) => {
    setEndingDate(newValue);
  };

  const handleSubmit = async (values: IQualification) => {
    console.log("submitting....");
    try {
      console.log("qualification data: ", values);

      const qualification: IQualification = {
        ...values,
        employeeId,
        educationStartedYear: startingDate.toDate(),
        educationEndedYear: endingDate.toDate(),
      };

      await createQualification({
        employeeId,
        qualification,
      }).unwrap();

      handleCloseModal();
    } catch (err: any) {}
  };

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
          <Box className="flex justify-between mb-10">
            <Box />
            <Typography variant="h5" className="underline">
              Add Qualification
            </Typography>
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "gray" }} />
            </IconButton>
          </Box>
          {/* form */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IQualification, { setSubmitting }) => {
              setSubmitting(true);

              handleSubmit(values);

              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                {/* eduction */}
                <Field
                  name="education"
                  margin="dense"
                  fullWidth
                  label="Education"
                  placeholder="Computer Science and Engineering"
                  size="small"
                  as={TextField}
                  error={touched.education && Boolean(errors.education)}
                  helperText={touched.education && errors.education}
                />

                {/* school */}
                <Field
                  name="school"
                  margin="dense"
                  fullWidth
                  label="School"
                  placeholder="Eg. Adama Science and Technology University"
                  size="small"
                  as={TextField}
                  error={touched.school && Boolean(errors.school)}
                  helperText={touched.school && errors.school}
                />

                {/* starting date */}
                <FormControl margin="dense" fullWidth size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="From"
                      inputFormat="MM/DD/YYYY"
                      value={startingDate}
                      onChange={handleStartingDateChange}
                      renderInput={(params: any) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>

                {/* ednding date */}
                <FormControl margin="dense" fullWidth size="small">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="To"
                      inputFormat="MM/DD/YYYY"
                      value={endingDate}
                      onChange={handleEndingDateChange}
                      renderInput={(params: any) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: 8, marginY: 3 }}
                >
                  Add Qualification
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default AddQualification;
