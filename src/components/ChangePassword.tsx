import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { useChangePasswordMutation } from "../services/employeeApiSlice";
import { useAppSelector } from "../app/hooks";
import { errorToast, successToast } from "../utils/toastify";
import { ToastContainer } from "react-toastify";

interface IChangePassword {
  password: string;
  confirmPassword: string;
}

const initialValues: IChangePassword = {
  password: "",
  confirmPassword: "",
};

export default function ChangePassword() {
  const [confirmPassCorrect, setConfirmPassword] = useState(false);

  const authEmpID = useAppSelector((state) => state.auth.sub);

  // employees/:id/change-password
  const [changePassword, { isLoading, isError, isSuccess }] =
    useChangePasswordMutation();

  const handleChangePassword = (values: IChangePassword) => {
    console.log("changing password", values);
    try {
      changePassword({
        employeeId: authEmpID,
        changePassword: { password: values.password },
      }).unwrap();

      console.log("password changed");
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (isError) {
      errorToast("Error While Changing Password");
    }
    if (isSuccess) {
      successToast("Successfully Changed Password");
    }
  }, [isError, isSuccess]);

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col h-screen items-center">
        <Typography variant="h5">Change Password</Typography>
        <Divider sx={{ my: 3, color: "white" }} />
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: any = {};

            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be longer than 6 charactes";
            } else if (values.password.length > 32) {
              errors.password = "Password must not exceed 32 characters";
            }

            if (
              values.password === "" ||
              values.password !== values.confirmPassword
            ) {
              errors.confirmPassword =
                "confirmation password must match password";
              setConfirmPassword(false);
            } else {
              setConfirmPassword(true);
            }

            return errors;
          }}
          onSubmit={(values: IChangePassword, { setSubmitting }) => {
            setSubmitting(true);
            handleChangePassword(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting, handleSubmit }) => (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Field
                type="password"
                name="password"
                margin="dense"
                label="New Password"
                size="small"
                as={TextField}
                sx={{ width: 450 }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <div className="flex justify-center items-center relative">
                <Field
                  type="password"
                  name="confirmPassword"
                  margin="dense"
                  fullWidth
                  label="Confirm Password"
                  size="small"
                  sx={{ width: 450 }}
                  as={TextField}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                {confirmPassCorrect && (
                  <CheckIcon className="absolute top-1/3 -right-10 text-green-500 border border-green-500 rounded-full" />
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                size="small"
                sx={{ mt: 2, width: 450 }}
              >
                Change Password
              </Button>
            </Box>
          )}
        </Formik>
      </div>
    </>
  );
}
