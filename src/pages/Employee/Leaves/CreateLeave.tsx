import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { IEmployee } from "../../../models/IEmployee";
import * as yup from "yup";
import { Field, Formik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import Divider from "@mui/material/Divider";
import { ILeave, LeaveTypeEnum } from "../../../models/ILeave";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const initialValues: ILeave = {
  leaveType: LeaveTypeEnum.ANNUAL_LEAVE,
  requestedDays: 1,
};

const validationSchema = yup.object({
  gender: yup
    .mixed()
    .oneOf([
      LeaveTypeEnum.ANNUAL_LEAVE,
      LeaveTypeEnum.MARRIAGE_LEAVE,
      LeaveTypeEnum.MATERNITY_LEAVE,
      LeaveTypeEnum.PATERNITY_LEAVE,
      LeaveTypeEnum.SICK_LEAVE,
    ]),
  type: yup
    .mixed()
    .oneOf([
      LeaveTypeEnum.ANNUAL_LEAVE,
      LeaveTypeEnum.MARRIAGE_LEAVE,
      LeaveTypeEnum.MATERNITY_LEAVE,
      LeaveTypeEnum.PATERNITY_LEAVE,
      LeaveTypeEnum.SICK_LEAVE,
    ])
    .required(),
  requestedDays: yup.number().required(),
});

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

function CreateLeave({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  return (
    <Box>
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
              Request Leave
            </Typography>
          </Box>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IEmployee, { setSubmitting }) => {
              setSubmitting(true);

              // handleSubmit(values);

              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <Box component="form" onSubmit={handleSubmit} sx={{ mx: "15%" }}>
                {/* Leave type */}
                <FormControl
                  fullWidth
                  margin="normal"
                  size="small"
                  error={touched.leaveType && Boolean(errors.leaveType)}
                >
                  <InputLabel id="user-type-select-label">
                    Leave Type
                  </InputLabel>
                  <Field
                    name="leaveType"
                    type="select"
                    label="Leave Type"
                    as={Select}
                    helperText={touched.leaveType && errors.leaveType}
                  >
                    <MenuItem value={LeaveTypeEnum.ANNUAL_LEAVE}>
                      Annual Leave
                    </MenuItem>
                    <MenuItem value={LeaveTypeEnum.MARRIAGE_LEAVE}>
                      Marriage Leave
                    </MenuItem>
                    <MenuItem value={LeaveTypeEnum.MATERNITY_LEAVE}>
                      Maternity Leave
                    </MenuItem>
                    <MenuItem value={LeaveTypeEnum.PATERNITY_LEAVE}>
                      Paternity Leave
                    </MenuItem>
                    <MenuItem value={LeaveTypeEnum.SICK_LEAVE}>
                      Sick Leave
                    </MenuItem>
                  </Field>
                  <FormHelperText>
                    select the type of leave you want to take
                    {/* {touched.employmentStatus && errors.employmentStatus} */}
                  </FormHelperText>
                </FormControl>

                <Divider sx={{ my: 3 }} />

                {/* Requested Days */}
                <Field
                  name="requestedDays"
                  margin="dense"
                  fullWidth
                  label="Requested Days"
                  type="number"
                  size="small"
                  as={TextField}
                  error={touched.requestedDays && Boolean(errors.requestedDays)}
                  helperText={touched.requestedDays && errors.requestedDays}
                />

                {/* Summary */}
                <Field
                  name="summary"
                  margin="dense"
                  fullWidth
                  label="Summary"
                  type="text"
                  multiline
                  rows={5}
                  placeholder="Here write the reason for the leave request..."
                  size="small"
                  as={TextField}
                  error={touched.requestedDays && Boolean(errors.requestedDays)}
                  helperText={touched.requestedDays && errors.requestedDays}
                />

                <Button
                  sx={{ my: 2 }}
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  size="small"
                >
                  Request Leave
                </Button>

                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </Box>
            )}
          </Formik>
        </Box>
      </Modal>
    </Box>
  );
}

export default CreateLeave;
