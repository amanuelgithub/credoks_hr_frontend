import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { Divider } from "@mui/material";

const employee = {
  id: "9876klkafa3",
  firstName: "John",
  fatherName: "Doe",
  phone: "09765433456",
  email: "johndoe@gmail.com",
  dateOfBirth: "24th July",
  dateOfJoining: "24th July",
  gender: "Male",
  reportsTo: "Jeffery Lalor",
  position: "Software Developer",
};

const personalInfo = {
  passportNumber: "98765345678",
  passportExpDate: "09-17-2026",
  tel: "09876543",
  nationality: "Ethiopian",
  religion: "Orthodox Christian",
  maritalStatus: "Married",
  numberOfChildren: "3",
};

const emergencyContacts = [
  {
    firstName: "Amanuel",
    lastName: "Girma",
    phone: "09876543",
    relation: "FAMILY",
  },
  {
    firstName: "Amanuel",
    lastName: "Girma",
    phone: "09876543",
    relation: "FAMILY",
  },
];

const qualifications = [
  {
    education: "BSc in Computer Science and Engineering",
    school: "Adama Science and Technology University",
    country: "Ethiopia",
    educationStartedYear: "2018",
    educationEndedYear: "2023",
  },
  {
    education: "MSc in AI",
    school: "Adama Science and Technology University",
    country: "Ethiopia",
    educationStartedYear: "2023",
    educationEndedYear: "2025",
  },
];

const experiences = [
  {
    jobTitle: "Software Engieer",
    companyName: "Credoks Digital",
    from: "2015",
    to: "2022",
  },
];

export default function DetailEmployee() {
  const personalInfoObjKeys = Object.keys(personalInfo);

  useEffect(() => {
    console.log("personalInfo", personalInfoObjKeys);
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Profile
        </Typography>
      </Box>

      {/* first profile section start*/}
      <Paper sx={{ marginY: 6, position: "relative" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={1.5}
            lg={1.5}
            sx={{ padding: 1 }}
            display="flex"
            justifyContent="center"
          >
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Amanuel Girma"
              src="https://appdevzone.com/frontend/images/dpage/t3.jpg"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            sx={{
              padding: 1,
              borderRight: "2px dashed #8e8e8e",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold" }}
                className="text-center md:text-start"
              >
                {employee.firstName} {employee.fatherName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#8e8e8e" }}
                className="text-center md:text-start"
              >
                {employee.position}
              </Typography>

              <Box marginY={2}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold" }}
                  className="text-center md:text-start"
                >
                  Employee ID : {employee.id}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#8e8e8e" }}
                  className="text-center md:text-start"
                >
                  {employee.dateOfJoining}
                </Typography>
              </Box>

              <Box marginY={3} className="flex justify-center sm:block">
                <Button variant="contained" color="secondary">
                  Send Message
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ padding: 1 }}>
            <Grid
              container
              spacing={1}
              display="flex"
              justifyContent="start"
              marginY={1}
            >
              <Grid
                item
                lg={3}
                md={3}
                sm={3}
                sx={{ color: "#5e798d", fontWeight: "bold" }}
              >
                Phone:
              </Grid>
              <Grid item lg={5} md={5} sm={5} sx={{ color: "#8e8e8e" }}>
                {employee.phone}
              </Grid>
            </Grid>

            <Grid container display="flex" justifyContent="start" marginY={1}>
              <Grid
                item
                sm={3}
                md={3}
                lg={3}
                sx={{ color: "#5e798d", fontWeight: "bold" }}
              >
                Email:
              </Grid>
              <Grid item sm={5} md={5} lg={5} sx={{ color: "#8e8e8e" }}>
                {employee.email}
              </Grid>
            </Grid>

            <Grid container display="flex" justifyContent="start" marginY={1}>
              <Grid
                item
                sm={3}
                md={3}
                lg={3}
                sx={{ color: "#5e798d", fontWeight: "bold" }}
              >
                Birthday:
              </Grid>
              <Grid item sm={5} md={5} lg={5} sx={{ color: "#8e8e8e" }}>
                {employee.dateOfBirth}
              </Grid>
            </Grid>

            <Grid container display="flex" justifyContent="start" marginY={1}>
              <Grid
                item
                sm={3}
                md={3}
                lg={3}
                sx={{ color: "#5e798d", fontWeight: "bold" }}
              >
                Gender:
              </Grid>
              <Grid item sm={5} md={5} lg={5} sx={{ color: "#8e8e8e" }}>
                {employee.gender}
              </Grid>
            </Grid>

            <Grid container display="flex" justifyContent="start" marginY={1}>
              <Grid
                item
                sm={3}
                md={3}
                lg={3}
                sx={{ color: "#5e798d", fontWeight: "bold" }}
              >
                Reports To:
              </Grid>
              <Grid item sm={5} md={5} lg={5} sx={{ color: "#8e8e8e" }}>
                {employee.reportsTo}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box position="absolute" top={6} right={6}>
          <IconButton>
            <EditIcon sx={{ color: "#8e8e8e" }} />
          </IconButton>
        </Box>
      </Paper>
      {/* first profile section end*/}

      {/* peronal information & Emergeny conteact information section start*/}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "light", color: "gray" }}
                className="text-center md:text-start"
              >
                Personal Information
              </Typography>
            </Box>

            <Box marginY={3}>
              <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ color: "#5e798d", fontWeight: "bold" }}
                >
                  Passport No.
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
                  {personalInfo.passportNumber}
                </Grid>
              </Grid>

              <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ color: "#5e798d", fontWeight: "bold" }}
                >
                  Passport Expiration Date
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
                  {personalInfo.passportExpDate}
                </Grid>
              </Grid>

              <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ color: "#5e798d", fontWeight: "bold" }}
                >
                  Telephone
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
                  {personalInfo.tel}
                </Grid>
              </Grid>

              <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ color: "#5e798d", fontWeight: "bold" }}
                >
                  Nationality
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
                  {personalInfo.nationality}
                </Grid>
              </Grid>

              <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ color: "#5e798d", fontWeight: "bold" }}
                >
                  Religion
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
                  {personalInfo.religion}
                </Grid>
              </Grid>

              <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ color: "#5e798d", fontWeight: "bold" }}
                >
                  Marital Status
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
                  {personalInfo.maritalStatus}
                </Grid>
              </Grid>

              <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ color: "#5e798d", fontWeight: "bold" }}
                >
                  Number of children
                </Grid>
                <Grid item xs={12} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
                  {personalInfo.numberOfChildren}
                </Grid>
              </Grid>
            </Box>

            <Box position="absolute" top={6} right={6}>
              <IconButton>
                <EditIcon sx={{ color: "#8e8e8e" }} />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: "light", color: "gray" }}
                className="text-center md:text-start"
              >
                Emergency Contacts
              </Typography>
            </Box>

            <Box marginY={3}>
              {emergencyContacts.map((emergencyContact, index) => {
                return (
                  <Box>
                    <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#5e798d", fontWeight: "bold" }}
                      >
                        First Name :
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#8e8e8e" }}
                      >
                        {emergencyContact.firstName}
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#5e798d", fontWeight: "bold" }}
                      >
                        Last Name :
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#8e8e8e" }}
                      >
                        {emergencyContact.lastName}
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#5e798d", fontWeight: "bold" }}
                      >
                        Phone :
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#8e8e8e" }}
                      >
                        {emergencyContact.phone}
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} fontSize={14} paddingY={0.5}>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#5e798d", fontWeight: "bold" }}
                      >
                        Relation :
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        sx={{ color: "#8e8e8e" }}
                      >
                        {emergencyContact.relation}
                      </Grid>
                    </Grid>

                    <Divider
                      sx={{
                        display: `${
                          index === emergencyContacts.length - 1
                            ? "none"
                            : "hidden"
                        }`,
                      }}
                    />
                  </Box>
                );
              })}
            </Box>

            <Box position="absolute" top={6} right={6}>
              <IconButton>
                <EditIcon sx={{ color: "#8e8e8e" }} />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* peronal information & Emergeny conteact information section end*/}
    </Box>
  );
}
