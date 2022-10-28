import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../components/Copyright";
import { useAppDispatch } from "../app/hooks";
import { useLoginMutation } from "../services/authApiSlice";
import { IAuthUser, setAuthUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Loading from "../components/Loading";
import { Field, Formik } from "formik";
import { IAuth } from "../models/IAuth";
import { IToken } from "../models/IToken";
import jwt_decode from "jwt-decode";
import { UserTypeEnum } from "../models/IEmployee";

const initialValues: IAuth = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function Login() {
  const [login, { isLoading, isError }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IAuth) => {
    try {
      const userData: IToken = await login(values).unwrap();

      const user: Partial<IAuthUser> = jwt_decode(userData.access_token);

      dispatch(
        setAuthUser({
          ...userData,
          sub: user.sub ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          email: user.email ?? "",
          userType: user.userType ?? "",
        })
      );

      user.userType !== undefined && user.userType !== ""
        ? dashboardRedirector(user.userType)
        : console.log(
            "Error: could not login because user type is not specified"
          );
    } catch (err: any) {
      console.log("Error: ", err);
    }
  };

  const dashboardRedirector = (userType: UserTypeEnum) => {
    if (userType === UserTypeEnum.ADMIN) navigate("/admin-dashboard");
    if (userType === UserTypeEnum.EMPLOYEE) navigate("/employee-dashboard");
    if (userType === UserTypeEnum.HR) navigate("/hr-dashboard");
    if (userType === UserTypeEnum.MANAGER) navigate("/manager-dashboard");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(images/credoks-logo.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="relative"
        >
          {isLoading ? <Loading /> : null}

          {isError ? (
            <p className="text-xs text-red-300">
              Authentication Error. Please check your credentials and try again!
            </p>
          ) : null}

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IAuth, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched, handleSubmit, isSubmitting }) => (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Field
                  name="email"
                  margin="normal"
                  fullWidth
                  size="small"
                  label="Email Address"
                  autoComplete="email"
                  as={TextField}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  name="password"
                  margin="normal"
                  fullWidth
                  size="small"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  as={TextField}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  size="small"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
