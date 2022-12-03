import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import Select from "@mui/material/Select";
import AttachFiles from "../../../components/AttachFiles/AttachFiles";
import { CompanyStatusEnum } from "../../../models/ICompany";
import { useAddCompanyMutation } from "../../../services/companyApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { FormHelperText, IconButton, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

interface FormValues {
  name: string;
  logo: string;
  companyStatus: CompanyStatusEnum;
  // bussinessType: string;
  summary: string;
}

const initialValues: FormValues = {
  name: "",
  logo: "",
  companyStatus: CompanyStatusEnum.INACTIVE,
  // bussinessType: "",
  summary: "",
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

function AddCompany({
  openModal,
  handleCloseModal,
}: {
  openModal: boolean;
  handleCloseModal: () => void;
}) {
  const [createCompany, { isSuccess, isError }] = useAddCompanyMutation();

  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues) => {
    try {
      await createCompany(values).unwrap();

      handleCloseModal();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfuly created company.", {
        autoClose: 2000,
        hideProgressBar: true,
      });

      navigate("/admin-dashboard/companies");
    } else if (isError)
      toast.error("Error creating company.", {
        autoClose: 15000,
        hideProgressBar: true,
      });
  }, [isSuccess, isError]);

  // <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
              Add Company
            </Typography>
            <IconButton size="small" onClick={handleCloseModal}>
              <CloseIcon sx={{ color: "gray" }} />
            </IconButton>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: FormValues, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit({ ...values });
              setSubmitting(false);
            }}
          >
            {({ errors, touched, handleSubmit, isSubmitting }) => (
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
                  error={touched.companyStatus && Boolean(errors.companyStatus)}
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
                    <MenuItem value={CompanyStatusEnum.ACTIVE}>Active</MenuItem>
                    <MenuItem value={CompanyStatusEnum.INACTIVE}>
                      Inactive
                    </MenuItem>
                  </Field>
                  <FormHelperText>
                    {touched.companyStatus && errors.companyStatus}
                  </FormHelperText>
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
                    Create Company
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

export default AddCompany;
