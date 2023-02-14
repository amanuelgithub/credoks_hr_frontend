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
import Button from "@mui/material/Button";
import {
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../services/departmentApiSlice";
import { IDepartment } from "../../models/IDepartment";
import { errorToast, successToast } from "../../utils/toastify";

const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "55%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

function EditDepartment({
  id,
  openModal,
  handleCloseModal,
}: {
  id: string;
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const { data: department } = useGetDepartmentQuery(id);
  const [updateDepartment, { isSuccess, isError }] =
    useUpdateDepartmentMutation();

  const handleSubmit = async (values: IDepartment) => {
    try {
      await updateDepartment(values).unwrap();
      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) successToast("Successfully Updated Department.");
    else if (isError) errorToast("Error in updating Department.");
  }, [isSuccess, isError]);

  return (
    <>
      {department && (
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
                  Edit Department
                </Typography>
              </Box>
              <Formik
                initialValues={department}
                validationSchema={validationSchema}
                onSubmit={(values: IDepartment, { setSubmitting }) => {
                  setSubmitting(true);
                  handleSubmit(values);
                  setSubmitting(false);
                }}
              >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Box>
                      {/* Company Name */}
                      <Field
                        name="name"
                        margin="dense"
                        fullWidth
                        label="Company Name"
                        type="text"
                        size="small"
                        as={TextField}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />

                      {/* Description */}
                      <Field
                        name="description"
                        margin="dense"
                        fullWidth
                        multiline
                        rows={3}
                        label="Description"
                        size="small"
                        type="text"
                        as={TextField}
                        error={
                          touched.description && Boolean(errors.description)
                        }
                        helperText={touched.description && errors.description}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        size="small"
                      >
                        Update Department
                      </Button>
                    </Box>
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

export default EditDepartment;
