import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Field, Formik } from "formik";
import { IPayroll, MonthEnum } from "../../../models/IPayroll";
import { useGetCompanyQuery } from "../../../services/companyApiSlice";
import * as yup from "yup";
import { useAppSelector } from "../../../app/hooks";
import TextField from "@mui/material/TextField";
import { Button, Divider, Typography } from "@mui/material";
import { useProcessPayrollMutation } from "../../../services/payrollApiSlice";
import Loading from "../../../components/Loading";
import { useEffect } from "react";
import { errorToast, successToast } from "../../../utils/toastify";
import { ToastContainer } from "react-toastify";
import Payrolls from "./Payrolls";
import Breadcrumbs from "../../../components/Breadcrumbs";

const initialValues: IPayroll = {
  //   companyId: "",
  month: undefined,
  year: undefined,
};

const validationSchema = yup.object({
  //   companyId: yup.string().required("Company is required!"),
  month: yup
    .mixed()
    .oneOf([
      MonthEnum.January,
      MonthEnum.February,
      MonthEnum.March,
      MonthEnum.April,
      MonthEnum.May,
      MonthEnum.June,
      MonthEnum.July,
      MonthEnum.August,
      MonthEnum.September,
      MonthEnum.October,
      MonthEnum.November,
      MonthEnum.December,
    ])
    .required("Month is required!"),
  year: yup.string().required("Year is required!"),
});

function ProcessPayroll() {
  // authenticated user companyId
  const companyId = useAppSelector((state) => state.auth.companyId);

  const { data: company } = useGetCompanyQuery(companyId);

  const [processPayroll, { isSuccess, isError }] = useProcessPayrollMutation();

  useEffect(() => {
    if (isSuccess) {
      successToast("Payroll Processed Successfully!");
    } else if (isError) {
      errorToast("Payroll Processing Error! Check if it is already processed");
    }
  }, [isError, isSuccess]);

  const handleSubmit = async (values: IPayroll) => {
    try {
      console.log("processing payroll....");
      await processPayroll({
        ...values,
        month: values.month,
        companyId,
      }).unwrap();
      console.log("Payroll Processed Successfully!!!!");
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  return (
    <div className="h-full relative">
      <ToastContainer />

      <Breadcrumbs />

      <Box marginY={3} textAlign="center">
        <Typography variant="h5">
          CREATE A PAYROLL FOR {company.name.toString().toUpperCase()}
        </Typography>
      </Box>
      <div>
        <TextField variant="standard" value={company.name} disabled />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: IPayroll, { setSubmitting }) => {
            setSubmitting(true);

            handleSubmit(values);

            setTimeout(() => {
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => (
            <Box component="form" onSubmit={handleSubmit}>
              <div className="w-full flex gap-10">
                <FormControl
                  fullWidth
                  variant="standard"
                  margin="normal"
                  size="small"
                  error={touched.month && Boolean(errors.month)}
                >
                  <InputLabel id="user-type-select-label">Month</InputLabel>
                  <Field
                    name="month"
                    type="select"
                    label="Month"
                    as={Select}
                    helperText={touched.month && errors.month}
                  >
                    <MenuItem value={MonthEnum.January}>January</MenuItem>
                    <MenuItem value={MonthEnum.February}>February</MenuItem>
                    <MenuItem value={MonthEnum.March}>March</MenuItem>
                    <MenuItem value={MonthEnum.April}>April</MenuItem>
                    <MenuItem value={MonthEnum.May}>May</MenuItem>
                    <MenuItem value={MonthEnum.June}>June</MenuItem>
                    <MenuItem value={MonthEnum.July}>July</MenuItem>
                    <MenuItem value={MonthEnum.August}>August</MenuItem>
                    <MenuItem value={MonthEnum.September}>September</MenuItem>
                    <MenuItem value={MonthEnum.October}>October</MenuItem>
                    <MenuItem value={MonthEnum.November}>November</MenuItem>
                    <MenuItem value={MonthEnum.December}>December</MenuItem>
                  </Field>
                </FormControl>

                <FormControl
                  fullWidth
                  variant="standard"
                  margin="normal"
                  size="small"
                  error={touched.year && Boolean(errors.year)}
                >
                  <InputLabel id="user-type-select-label">Year</InputLabel>
                  <Field
                    name="year"
                    type="select"
                    label="Year"
                    as={Select}
                    helperText={touched.year && errors.year}
                  >
                    <MenuItem value={new Date().getFullYear()}>
                      {new Date().getFullYear()} G.C
                    </MenuItem>
                    {/* <MenuItem value={2023}>2023 G.C</MenuItem> */}
                  </Field>
                </FormControl>
              </div>

              {/* show loading when the submitting the button */}
              {isSubmitting && <Loading />}

              <Box display="flex" justifyContent="center" marginY={5}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outlined"
                  sx={{ borderRadius: 8 }}
                >
                  Run Payroll Processor
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </div>

      <Divider sx={{ marginY: 10 }} />

      <Box>
        <Typography variant="h5" sx={{ marginY: 3 }}>
          ALL PROCESSED PAYROLLS
        </Typography>
        <Payrolls />
      </Box>
    </div>
  );
}

export default ProcessPayroll;
