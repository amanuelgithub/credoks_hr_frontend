import { useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Field, Formik } from "formik";
import { IDepartment } from "../../../models/IDepartment";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAddDepartmentMutation } from "../../../services/departmentApiSlice";
import { errorToast, successToast } from "../../../utils/toastify";
import { useAppSelector } from "../../../app/hooks";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const initialValues: IDepartment = {
  name: "",
  description: "",
  companyId: "",
};

const validationSchema = yup.object({
  name: yup.string().required("Department name is a required field"),
  description: yup
    .string()
    .required("Department description is a required field"),
});

function AddDepartment({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const companyId = useAppSelector((state) => state.auth.companyId);
  const [createDepartment, { isSuccess, isError }] = useAddDepartmentMutation();

  useEffect(() => {
    if (isSuccess) {
      successToast("Department created successfully");
    }
    if (isError) {
      errorToast("Error while creating department");
    }
  }, [isSuccess, isError]);

  const handleSubmit = async (department: IDepartment) => {
    console.log("submitting...");
    try {
      department = { ...department, companyId };
      await createDepartment(department).unwrap();
      handleCloseModal();
    } catch (err: any) {
      console.log(`Error while creating department: ${err}`);
    }
  };

  return (
    <Modal open={openModal} onClose={() => {}}>
      <Box sx={modalStyle}>
        <Box className="flex justify-between mb-10">
          <Box />
          <Typography variant="h5" className="underline">
            Add Department
          </Typography>
          <IconButton size="small" onClick={handleCloseModal}>
            <CloseIcon sx={{ color: "gray" }} />
          </IconButton>
        </Box>
        {/* form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(department: IDepartment, { setSubmitting }) => {
            setSubmitting(false);
            handleSubmit(department);
            setSubmitting(true);
          }}
        >
          {({ values, errors, touched, handleSubmit, isSubmitting }) => (
            <Box component="form" onSubmit={handleSubmit}>
              {/* Department Name */}
              <Field
                as={TextField}
                name="name"
                margin="normal"
                fullWidth
                label="Department Name"
                type="text"
                size="small"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              {/* Department Description */}
              <Field
                as={TextField}
                name="description"
                margin="normal"
                fullWidth
                multiline
                rows={3}
                label="Description"
                type="text"
                size="small"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                size="small"
                sx={{ marginY: 2 }}
              >
                Add Department
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default AddDepartment;
