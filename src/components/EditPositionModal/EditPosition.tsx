import React, { useEffect } from "react";
import {
  useGetPositionQuery,
  useUpdatePositionMutation,
} from "../../services/positionApiSlice";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, successToast } from "../../utils/toastify";
import { IPosition } from "../../models/IPosition";
import Modal from "@mui/material/Modal";
import { ToastContainer } from "react-toastify";
import * as yup from "yup";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Field, Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "35%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const validationSchema = yup.object({
  title: yup.string().required("title cannot be empty"),
});

type Props = {
  id: string;
  isOpen: boolean;
  handleCloseModal: () => void;
};

export function EditPosition(props: Props) {
  const { data: position } = useGetPositionQuery(props.id);
  const [updatePosition, { isSuccess, isError }] = useUpdatePositionMutation();

  useEffect(() => {
    if (isError) {
      errorToast("Error updating position!");
    } else if (isSuccess) {
      successToast("Successfully updated position!");
    }
  }, [isError, isSuccess]);

  const handleSubmit = async (position: IPosition) => {
    const newPosition: IPosition = {
      id: position.id,
      title: position.title,
      departmentId: position.departmentId,
      companyId: position.companyId,
    };

    try {
      await updatePosition(newPosition).unwrap();

      props.handleCloseModal();
    } catch (error) {
      console.log("Error updating position: ", error);
    }
  };

  return (
    <>
      {position && (
        <>
          <ToastContainer />

          <Modal
            open={props.isOpen}
            onClose={props.handleCloseModal}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box className="flex justify-between mb-10">
                <Box />
                <Typography variant="h5" className="underline">
                  Edit Position
                </Typography>
                <IconButton size="small" onClick={props.handleCloseModal}>
                  <CloseIcon sx={{ color: "gray" }} />
                </IconButton>
              </Box>
              {/* form */}
              <Formik
                initialValues={position}
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

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        size="small"
                        sx={{ my: 2 }}
                      >
                        Update Position
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
