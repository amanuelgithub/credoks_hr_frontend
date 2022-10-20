import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function AddEmployee() {
  const [dateOfJoiningValue, setDateOfJoiningValue] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );
  const [dateOfConfirmationValue, setDateOfConfirmationValue] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );

  const handleDateOfJoiningChange = (newValue: any) => {
    setDateOfJoiningValue(newValue);
  };
  const handleDateOfConfirmationChange = (newValue: any) => {
    setDateOfConfirmationValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box className="flex flex-col items-center my-6">
        <Typography variant="h4" component="h4" className="underline">
          Add Employee
        </Typography>
      </Box>
      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} md={4} lg={5}>
          <Box sx={{ my: 5 }}>
            <Typography variant="h5" component="h5">
              Step 1. <span>Basic Informations:</span>
            </Typography>
          </Box>
          {/* First Name */}
          <TextField
            margin="dense"
            fullWidth
            id="firstName"
            label="First Name"
            size="small"
          />
          {/* Last Name */}
          <TextField margin="dense" fullWidth label="Last Name" size="small" />
          {/* Email */}
          <TextField margin="dense" fullWidth label="Email" size="small" />
          {/* Phone */}
          <TextField margin="dense" fullWidth label="Phone" size="small" />
          {/* password */}
          <div>
            <TextField
              margin="dense"
              fullWidth
              type="password"
              label="Password"
              placeholder="password"
              size="small"
            />
            <div className="flex justify-between">
              <Button size="small" variant="contained">
                Generate Password
              </Button>
              <p>afka24343!@#4</p>
            </div>
          </div>
          {/* gender */}
          <FormControl fullWidth margin="dense" size="small">
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="male"
              name="radio-buttons-group"
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          {/* data of joining date picker */}
          <FormControl margin="dense" fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Joining Date"
                inputFormat="MM/DD/YYYY"
                value={dateOfJoiningValue}
                onChange={handleDateOfJoiningChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          {/* employee status */}
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel id="employee-status-select-label">
              Employee Status
            </InputLabel>
            <Select
              labelId="employee-status-select-label"
              id="employee-status"
              // value={status}
              label="Employee Status"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Permanent</MenuItem>
              <MenuItem value={20}>Contract</MenuItem>
              <MenuItem value={30}>Manual</MenuItem>
            </Select>
          </FormControl>

          {/* data of confirmation date picker */}
          <FormControl margin="dense" fullWidth size="small">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Confirmation Date"
                inputFormat="MM/DD/YYYY"
                value={dateOfConfirmationValue}
                onChange={handleDateOfConfirmationChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>

          <TextField
            margin="dense"
            fullWidth
            label="Father Name"
            size="small"
          />
          <TextField
            margin="dense"
            fullWidth
            label="Spouse Name"
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={8} lg={5}>
          <Box sx={{ my: 5 }}>
            <Typography variant="h5" component="h5">
              Step 2. <span>Payment Method:</span>
            </Typography>
          </Box>

          {/* Payment Methods */}
          <FormControl fullWidth margin="dense" size="small">
            <InputLabel id="payment-methods-select-label">
              Payment Methods
            </InputLabel>
            <Select
              labelId="payment-methods-select-label"
              id="payment-method"
              // value={status}
              label="Payment Method"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Bank Transfer</MenuItem>
              <MenuItem value={20}>Cash</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Accound Number"
            margin="dense"
            size="small"
            placeholder="Accound Number"
            fullWidth
          />
          <TextField
            type="number"
            margin="dense"
            size="small"
            fullWidth
            label="TIN Number"
            placeholder="TIN Number"
          />
          <Button variant="contained" size="small">
            Add Employee
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddEmployee;
