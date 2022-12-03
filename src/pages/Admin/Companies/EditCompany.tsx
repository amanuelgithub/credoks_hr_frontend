import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AttachFiles from "../../../components/AttachFiles/AttachFiles";
import { CompanyStatusEnum, ICompany } from "../../../models/ICompany";
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../services/companyApiSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../utils/toastify";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

// style applied to the modals container
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
};

const validationSchema = yup.object({
  name: yup.string().required(),
  companyStatus: yup
    .mixed()
    .oneOf([CompanyStatusEnum.ACTIVE, CompanyStatusEnum.INACTIVE])
    .required(),
  // bussinessType: yup.string(),
  summary: yup.string().required(),
});

function EditCompany({
  id,
  openModal,
  handleCloseModal,
}: {
  id: string;
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const { data } = useGetCompanyQuery(id);
  const [updateCompany, { isSuccess, isError }] = useUpdateCompanyMutation();

  const navigate = useNavigate();

  const handleSubmit = async (values: ICompany) => {
    try {
      await updateCompany(values).unwrap();

      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      successToast("Successfuly updated company.");
      navigate("/admin-dashboard/companies");
    } else if (isError) errorToast("Error updating company.");
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
              Edit Company
            </Typography>
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "gray" }} />
            </IconButton>
          </Box>

          {data && (
            <Formik
              initialValues={data}
              validationSchema={validationSchema}
              onSubmit={(values: ICompany) => {
                handleSubmit({ ...values });
              }}
            >
              {({ values, errors, touched, handleSubmit, isSubmitting }) => (
                <Box component="form" onSubmit={handleSubmit}>
                  {/* Name */}
                  <Field
                    margin="dense"
                    fullWidth
                    label="Name"
                    size="small"
                    name="name"
                    type="text"
                    as={TextField}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  {/* Summary: Description */}
                  <Field
                    margin="dense"
                    fullWidth
                    multiline
                    rows={5}
                    label="Company Description"
                    size="small"
                    type="text"
                    name="summary"
                    as={TextField}
                    error={touched.summary && Boolean(errors.summary)}
                    helperText={touched.summary && errors.summary}
                  />

                  {/* company status */}
                  <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    error={
                      touched.companyStatus && Boolean(errors.companyStatus)
                    }
                  >
                    <InputLabel id="company-status-select-label">
                      Company Status
                    </InputLabel>
                    <Field
                      name="status"
                      type="select"
                      label="Company Status"
                      as={Select}
                    >
                      <MenuItem value={CompanyStatusEnum.ACTIVE}>
                        Active
                      </MenuItem>
                      <MenuItem value={CompanyStatusEnum.INACTIVE}>
                        Inactive
                      </MenuItem>
                    </Field>
                  </FormControl>

                  <AttachFiles />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <Button
                      type="submit"
                      sx={{ my: 2 }}
                      size="small"
                      disabled={isSubmitting}
                      variant="contained"
                    >
                      Update Company
                    </Button>
                  </Box>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </Box>
              )}
            </Formik>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default EditCompany;
