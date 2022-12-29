/**
 *
 * 1. select company
 * 2. select the payroll year
 * 3. select payroll monthc
 *
 */

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
import { Button, Typography } from "@mui/material";
import { useProcessPayrollMutation } from "../../../services/payrollApiSlice";

const initialValues: IPayroll = {
  //   companyId: "",
  month: MonthEnum.January,
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

  const [processPayroll, { isSuccess, isError, isLoading }] =
    useProcessPayrollMutation();

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
    <div className="h-screen">
      <Box marginY={3} textAlign="center">
        <Typography variant="h5">
          Create A Payroll for {company.name}
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

            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleSubmit, isSubmitting }) => (
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
                    <MenuItem value={2022}>2022 G.C</MenuItem>
                    <MenuItem value={2023}>2023 G.C</MenuItem>
                  </Field>
                </FormControl>
              </div>

              <Box display="flex" justifyContent="center" marginY={5}>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ borderRadius: 8 }}
                >
                  Run Payroll Processing
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProcessPayroll;
