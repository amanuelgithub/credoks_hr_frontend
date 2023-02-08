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
import Button from "@mui/material/Button";
import { useAddPositionMutation } from "../../../services/positionApiSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { useGetDepartmentsOfCompanyQuery } from "../../../services/departmentApiSlice";
import Select from "@mui/material/Select";
import { IPosition } from "../../../models/IPosition";
import { useAppSelector } from "../../../app/hooks";

const initialValues: IPosition = {
  title: "",
  //   companyId: "",
  departmentId: "",
};

const validationSchema = yup.object({
  title: yup.string().required("Position's name is a required field"),
  departmentId: yup.string().required("Department's id is a required field"),
});

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: "45%",
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
  const companyId = useAppSelector((state) => state.auth.companyId);
  const { data: departments } = useGetDepartmentsOfCompanyQuery(companyId);
  const [
    createPosition,
    { isSuccess: positionCreated, isError: errorCreatingPosition },
  ] = useAddPositionMutation();

  useEffect(() => {
    if (positionCreated) successToast("Successfully Added Position.");
    else if (errorCreatingPosition) errorToast("Error Creating Positions");
  }, [positionCreated, errorCreatingPosition]);

  const handleSubmit = async (position: IPosition) => {
    try {
      position = { ...position, companyId };
      await createPosition(position).unwrap();
      handleCloseModal();
    } catch (error: any) {
      console.log(`Error creating position: ${error}`);
    }
  };

  return (
    <>
      <ToastContainer />

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
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
            onSubmit={(values: IPosition, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <Box>
                  <Divider sx={{ my: 1 }} />

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
                    error={touched.departmentId && Boolean(errors.departmentId)}
                  >
                    <InputLabel id="user-type-select-label">
                      Department
                    </InputLabel>
                    <Field
                      name="departmentId"
                      type="select"
                      label="User Type"
                      as={Select}
                      helperText={touched.departmentId && errors.departmentId}
                    >
                      {departments?.map((department) => (
                        <MenuItem key={department.id} value={department.id}>
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
