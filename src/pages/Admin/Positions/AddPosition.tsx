import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import Divider from "@mui/material/Divider";
import { errorToast, successToast } from "../../../utils/toastify";
import Button from "@mui/material/Button";
import { IPosition } from "../../../models/IPosition";
import { useAddPositionMutation } from "../../../services/positionApiSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useGetDepartmentsQuery } from "../../../services/departmentApiSlice";
import Select from "@mui/material/Select";
import { useGetCompaniesQuery } from "../../../services/companyApiSlice";

const initialValues = {
  title: "",
  // companyId: "",
  // departmentId: "",
  department: null,
};

const validationSchema = yup.object({
  title: yup.string().required("Position's name is a required field"),
  // companyId: yup.string().required("Company's id is a required field"),
  // departmentId: yup.string().required("Department's id is a required field"),
  department: yup.object().required("Department id is a required field"),
});

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: "55%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

function AddPosition({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [createPosition, { isSuccess, isError }] = useAddPositionMutation();

  const { data: departments } = useGetDepartmentsQuery();

  const handleSubmit = async (values: any) => {
    const { title, department } = values;
    console.log("title: ", title, " department: ", department);
    try {
      await createPosition({
        title,
        companyId: department.companyId,
        departmentId: department.id,
      }).unwrap();
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
          <Box className="flex justify-between mb-10">
            <Box />
            <Typography variant="h5" className="underline">
              Add Position
            </Typography>
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "gray" }} />
            </IconButton>
          </Box>
          {/* form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: any, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
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

                  {/* Department Name */}
                  <FormControl
                    fullWidth
                    margin="normal"
                    size="small"
                    error={touched.department && Boolean(errors.department)}
                  >
                    <InputLabel id="user-type-select-label">
                      Department
                    </InputLabel>

                    <Field
                      name="department"
                      type="select"
                      label="User Type"
                      as={Select}
                      helperText={touched.department && errors.department}
                    >
                      {departments?.map((department) => (
                        <MenuItem key={department.id} value={department}>
                          {department.name}
                        </MenuItem>
                      ))}
                    </Field>
                    <FormHelperText>
                      select the department to add the position to
                    </FormHelperText>
                  </FormControl>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    size="small"
                  >
                    Create Position
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
