import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useGetQualificationsByEmployeeIdQuery } from "../../../services/qualificationApiSlice";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddQualification from "./AddQualification";
import AddIcon from "@mui/icons-material/Add";

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

// const qualifications = [
//   {
//     education: "BSc in Computer Science and Engineering",
//     school: "Adama Science and Technology University",
//     country: "Ethiopia",
//     educationStartedYear: "2018",
//     educationEndedYear: "2023",
//   },
//   {
//     education: "MSc in AI",
//     school: "Adama Science and Technology University",
//     country: "Ethiopia",
//     educationStartedYear: "2023",
//     educationEndedYear: "2025",
//   },
// ];

const experiences = [
  {
    jobTitle: "Software Engieer",
    companyName: "Credoks Digital",
    from: "2015",
    to: "2022",
  },
  {
    jobTitle: "Software Engieer",
    companyName: "Credoks Digital",
    from: "2015",
    to: "2022",
  },
];

export default function DetailEmployee() {
  const { id: employeeId } = useParams();
  const { data: qualifications } =
    useGetQualificationsByEmployeeIdQuery(employeeId);

  const [openAddQualificationModal, setOpenAddQualificationModal] =
    useState(false);
  const handleOpenAddQualificationModal = () =>
    setOpenAddQualificationModal(true);
  const handleCloseAddQualificationModal = () =>
    setOpenAddQualificationModal(false);

  const FieldRow = ({ title, value }: { title: any; value: any }) => (
    <Grid container spacing={2} fontSize={14} paddingY={0.5}>
      <Grid
        item
        xs={6}
        md={6}
        lg={6}
        sx={{ color: "#5e798d", fontWeight: "bold" }}
      >
        {title} :
      </Grid>
      <Grid item xs={6} md={6} lg={6} sx={{ color: "#8e8e8e" }}>
        {value}
      </Grid>
    </Grid>
  );

  return (
    <>
      <ToastContainer />
      {/* modals */}
      <AddQualification
        employeeId={employeeId ?? ""}
        openModal={openAddQualificationModal}
        handleCloseModal={handleCloseAddQualificationModal}
      />

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
              <Box marginY={4}>
                <FieldRow title="Phone" value={employee.phone} />
                <FieldRow title="Email" value={employee.email} />
                <FieldRow title="Birthday" value={employee.dateOfBirth} />
                <FieldRow title="Gender" value={employee.gender} />
                <FieldRow title="Reports To" value={employee.reportsTo} />
              </Box>
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
                <FieldRow
                  title="Passport No"
                  value={personalInfo.passportNumber}
                />
                <FieldRow
                  title="Passport Expiration Date"
                  value={personalInfo.passportExpDate}
                />
                <FieldRow title="Telephone" value={personalInfo.tel} />
                <FieldRow
                  title="Nationality"
                  value={personalInfo.nationality}
                />
                <FieldRow title="Religion" value={personalInfo.religion} />
                <FieldRow
                  title="Number of children"
                  value={personalInfo.maritalStatus}
                />
                <FieldRow
                  title="Passport Expiration Date"
                  value={personalInfo.numberOfChildren}
                />
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
                      <FieldRow
                        title="First Name"
                        value={emergencyContact.firstName}
                      />
                      <FieldRow
                        title="Last Name"
                        value={emergencyContact.lastName}
                      />
                      <FieldRow title="Phone" value={emergencyContact.phone} />
                      <FieldRow
                        title="Relation"
                        value={emergencyContact.relation}
                      />

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

        {/* Education & Experience section */}
        <Grid container spacing={2}>
          {/* Education Information */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "light", color: "gray" }}
                  className="text-center md:text-start"
                >
                  Education Information
                </Typography>
              </Box>
              {qualifications?.map((qualification, index) => {
                return (
                  <Box
                    key={qualification.id}
                    sx={{
                      borderLeft: "2px solid #dddddd",
                      position: "relative",
                      paddingX: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", color: "#5e798d" }}>
                      {qualification.school}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: "normal",
                        color: "#8e8e8e",
                      }}
                    >
                      {qualification.education}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: "normal",
                        color: "#8e8e8e",
                      }}
                    >
                      location : Ethiopia
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: "normal",
                          color: "#8e8e8e",
                        }}
                      >
                        {qualification.educationStartedYear}
                      </Typography>
                      {" - "}
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: "normal",
                          color: "#8e8e8e",
                        }}
                      >
                        {qualification.educationEndedYear}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "-6px",
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#dddddd",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                );
              })}

              <Box position="absolute" top={6} right={6}>
                <IconButton onClick={handleOpenAddQualificationModal}>
                  <AddIcon sx={{ color: "#8e8e8e" }} />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
          {/* Experiences */}
          <Grid item xs={12} md={6} lg={6}>
            <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "light", color: "gray" }}
                  className="text-center md:text-start"
                >
                  Experiences
                </Typography>
              </Box>

              {experiences.map((experience, index) => {
                return (
                  <Box
                    sx={{
                      borderLeft: "2px solid #dddddd",
                      position: "relative",
                      paddingX: 2,
                      paddingBottom: 2,
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", color: "#5e798d" }}>
                      {experience.jobTitle} at {experience.companyName}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: "normal",
                          color: "#8e8e8e",
                        }}
                      >
                        {experience.from}
                      </Typography>
                      {" - "}
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: "normal",
                          color: "#8e8e8e",
                        }}
                      >
                        {experience.to}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "-6px",
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#dddddd",
                        borderRadius: 8,
                      }}
                    />
                  </Box>
                );
              })}

              <Box position="absolute" top={6} right={6}>
                <IconButton>
                  <EditIcon sx={{ color: "#8e8e8e" }} />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
