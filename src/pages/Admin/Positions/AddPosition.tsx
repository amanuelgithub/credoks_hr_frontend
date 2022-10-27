import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import Divider from "@mui/material/Divider";
import { errorToast, successToast } from "../../../utils/toastify";
import { IDepartment } from "../../../models/IDepartment";
import Button from "@mui/material/Button";
import { IPosition } from "../../../models/IPosition";
import { useAddPositionMutation } from "../../../services/positionApiSlice";

const initialValues: IPosition = {
  title: "",
  qualification: "",
};

const validationSchema = yup.object({
  title: yup.string().required(),
  qualification: yup.string().required(),
});

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

function AddPosition({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [createPosition, { isLoading, isSuccess, isError }] =
    useAddPositionMutation();

  const handleSubmit = async (values: IDepartment) => {
    try {
      await createPosition(values).unwrap();
      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) successToast("Successfully Added Position.");
    else if (isError) errorToast("Error Creating Positions");
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
              Add Position
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IPosition, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              isSubmitting,
            }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <Box>
                  <Divider sx={{ my: 3 }} />

                  {/* Position Title */}
                  <Field
                    name="title"
                    margin="dense"
                    fullWidth
                    label="Position Title"
                    type="text"
                    size="small"
                    as={TextField}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  {/* Position Qualification */}
                  <Field
                    name="qualification"
                    margin="dense"
                    fullWidth
                    multiline
                    rows={3}
                    label="Qualification"
                    size="small"
                    type="text"
                    as={TextField}
                    error={
                      touched.qualification && Boolean(errors.qualification)
                    }
                    helperText={touched.qualification && errors.qualification}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    size="small"
                  >
                    Add Position
                  </Button>
                </Box>
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default AddPosition;
