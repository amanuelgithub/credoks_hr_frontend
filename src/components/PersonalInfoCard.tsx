import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FieldItem from "./FieldItem";

const personalInfo = {
  passportNumber: "98765345678",
  passportExpDate: "09-17-2026",
  tel: "09876543",
  nationality: "Ethiopian",
  religion: "Orthodox Christian",
  maritalStatus: "Married",
  numberOfChildren: "3",
};

function PersonalInfoCard() {
  return (
    <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "light", color: "gray" }}
          className="text-center md:text-start"
        >
          Personal Information
        </Typography>
      </Box>

      <Box marginY={3}>
        <FieldItem title="Passport No" value={personalInfo.passportNumber} />
        <FieldItem
          title="Passport Expiration Date"
          value={personalInfo.passportExpDate}
        />
        <FieldItem title="Telephone" value={personalInfo.tel} />
        <FieldItem title="Nationality" value={personalInfo.nationality} />
        <FieldItem title="Religion" value={personalInfo.religion} />
        <FieldItem
          title="Number of children"
          value={personalInfo.maritalStatus}
        />
        <FieldItem
          title="Passport Expiration Date"
          value={personalInfo.numberOfChildren}
        />
      </Box>
    </Paper>
  );
}

export default PersonalInfoCard;
