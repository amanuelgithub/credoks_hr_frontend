import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { IExperience } from "../models/IExperience";
import { useAddExperienceMutation } from "../services/experienceApiSlice";
import { errorToast, successToast } from "../utils/toastify";

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

const initialValues: IExperience = {
  jobTitle: "",
  companyName: "",
  from: "",
  to: "",
};

const validationSchema = yup.object({
  jobTitle: yup.string().required(),
  companyName: yup.string().required(),
  from: yup.string().required(),
  to: yup.string().required(),
});

function AddExperience({
  employeeId,
  openModal,
  handleCloseModal,
}: {
  employeeId: string;
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [createExperience, { isSuccess, isError }] = useAddExperienceMutation();

  const handleSubmit = async (values: IExperience) => {
    console.log("submitting....");
    try {
      console.log("experience data: ", values);

      const experience: IExperience = {
        ...values,
      };

      await createExperience({
        employeeId,
        experience,
      }).unwrap();

      handleCloseModal();
    } catch (err: any) {}
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("Experience Added Successfully!");
    }

    if (isError) {
      errorToast("Experience Added Emergency Contact!");
    }
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
          <Box className="flex justify-between mb-10">
            <Box />
            <Typography variant="h5" className="underline">
              Add Experience
            </Typography>
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "gray" }} />
            </IconButton>
          </Box>
          {/* form */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IExperience, { setSubmitting }) => {
              setSubmitting(true);

              handleSubmit(values);

              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                {/* jobTitle */}
                <Field
                  name="jobTitle"
                  margin="dense"
                  fullWidth
                  label="Job Title"
                  placeholder="Eg. Sr. Software Developer"
                  size="small"
                  as={TextField}
                  error={touched.jobTitle && Boolean(errors.jobTitle)}
                  helperText={touched.jobTitle && errors.jobTitle}
                />

                {/* Company Name */}
                <Field
                  name="companyName"
                  margin="dense"
                  fullWidth
                  label="Company Name"
                  placeholder="Eg. Credoks Digital"
                  size="small"
                  as={TextField}
                  error={touched.companyName && Boolean(errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
                />

                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid item sm={5} md={5} lg={5}>
                    {/* From */}
                    <Field
                      name="from"
                      margin="dense"
                      fullWidth
                      label="From"
                      placeholder="Eg. 2017"
                      size="small"
                      as={TextField}
                      error={touched.from && Boolean(errors.from)}
                      helperText={touched.from && errors.from}
                    />
                  </Grid>
                  <Grid item sm={5} md={5} lg={5}>
                    {/* Company Name */}
                    <Field
                      name="to"
                      margin="dense"
                      fullWidth
                      label="To"
                      placeholder="Eg. 2022"
                      size="small"
                      as={TextField}
                      error={touched.to && Boolean(errors.to)}
                      helperText={touched.to && errors.to}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  size="small"
                  sx={{ marginY: 3 }}
                >
                  Add Experience
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default AddExperience;
