import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import AttachFiles from "../../../components/AttachFiles/AttachFiles";
import { CompanyStatusEnum, ICompany } from "../../../models/ICompany";
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../services/companyApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { FormHelperText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

let initialValues: ICompany;

const validationSchema = yup.object({
  name: yup.string().required(),
  summary: yup.string().required(),
  status: yup
    .mixed()
    .oneOf([CompanyStatusEnum.ACTIVE, CompanyStatusEnum.INACTIVE], "some")
    .required(),
});

function EditCompany() {
  const { state } = useLocation();
  const { id } = state;
  const { data } = useGetCompanyQuery(id);
  const [updateCompany, { isLoading, isSuccess, isError }] =
    useUpdateCompanyMutation();

  const handleSubmit = async (values: ICompany) => {
    try {
      await updateCompany(values).unwrap();
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    initialValues = data;
  }, [data]);

  useEffect(() => {
    if (isSuccess)
      toast.success("Successfuly updated company.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    else if (isError)
      toast.error("Error updating company.", {
        autoClose: 15000,
        hideProgressBar: true,
      });
  }, [isSuccess, isError]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ToastContainer />

      <Box className="mx-24 my-6">
        <Link
          to="/admin-dashboard/companies"
          className="text-blue-400 underline visited:text-blue-900"
        >
          view companies
        </Link>
      </Box>
      <Box className="flex flex-col items-center my-6">
        <Typography variant="h4" component="h4" className="underline">
          Update Company
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: ICompany, { setSubmitting }) => {
          handleSubmit({ ...values });
        }}
      >
        {({ errors, touched, handleSubmit, isSubmitting }) => (
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={5} justifyContent="center">
              <Grid item xs={12} md={4} lg={5}>
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
                  error={touched.status && Boolean(errors.status)}
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
                </FormControl>
              </Grid>

              <Grid item xs={12} md={8} lg={5}>
                <AttachFiles />
              </Grid>
            </Grid>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                px: 12,
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
          </Box>
        )}
      </Formik>
    </Container>
  );
}

export default EditCompany;