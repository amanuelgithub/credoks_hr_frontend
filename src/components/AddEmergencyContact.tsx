import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Field, Formik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  IEmergencyContact,
  RelationTypeEnum,
} from "../models/IEmergencyContact";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { useAddEmergencyContactMutation } from "../services/emergencyContactApiSlice";
import { useEffect } from "react";
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

const initialValues: IEmergencyContact = {
  firstName: "",
  lastName: "",
  phone: "",
  relation: "",
};

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  relation: yup.string().required(),
});
function AddEmergencyContact({
  employeeId,
  openModal,
  handleCloseModal,
}: {
  employeeId: string;
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [createEmergencyContact, { isSuccess, isError }] =
    useAddEmergencyContactMutation();

  const handleSubmit = async (values: IEmergencyContact) => {
    console.log("submitting...");

    try {
      const emergencyContact: IEmergencyContact = {
        ...values,
        employeeId,
      };

      console.log("Emergency Contact request value: ", emergencyContact);

      await createEmergencyContact({
        employeeId,
        emergencyContact,
      }).unwrap();

      console.log("Emergency Contact request value: ", emergencyContact);

      handleCloseModal();
    } catch (err: any) {}
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("Emergency Contact Added Successfully!");
    }

    if (isError) {
      errorToast("Can Not Adde Emergency Contact!");
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
              Add Emergency Contacts
            </Typography>
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "gray" }} />
            </IconButton>
          </Box>
          {/* form */}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IEmergencyContact, { setSubmitting }) => {
              setSubmitting(true);

              handleSubmit(values);

              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit}>
                {/* First Name */}
                <Field
                  name="firstName"
                  margin="dense"
                  fullWidth
                  label="First Name"
                  placeholder="eg. Amanuel"
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
                  placeholder="eg. Girma"
                  size="small"
                  as={TextField}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />

                {/* phone */}
                <Field
                  name="phone"
                  margin="dense"
                  fullWidth
                  label="Phone"
                  placeholder="Eg. 0963158999"
                  size="small"
                  as={TextField}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />

                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel id="">Relation Type</InputLabel>
                  <Field
                    name="relation"
                    type="select"
                    label="Relation Type"
                    as={Select}
                  >
                    <MenuItem value={RelationTypeEnum.FATHER}>Father</MenuItem>
                    <MenuItem value={RelationTypeEnum.MOTHER}>Mother</MenuItem>
                    <MenuItem value={RelationTypeEnum.BROTHER}>
                      Brother
                    </MenuItem>
                    <MenuItem value={RelationTypeEnum.SISTER}>Sister</MenuItem>
                    <MenuItem value={RelationTypeEnum.FAMILY}>
                      Distant Family
                    </MenuItem>
                    <MenuItem value={RelationTypeEnum.FRIEND}>Friend</MenuItem>
                  </Field>
                </FormControl>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  size="small"
                  sx={{ marginY: 3 }}
                >
                  Add Emergency Contact
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default AddEmergencyContact;
