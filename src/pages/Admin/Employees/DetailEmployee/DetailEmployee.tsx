import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddQualification from "./AddQualification";
import QualificationsCard from "./QualificationsCard";
import EmergencyContactCard from "./EmergencyContactCard";
import ExperienceCard from "./ExperienceCard";
import PersonalInfoCard from "./PersonalInfoCard";
import FieldItem from "./FieldItem";
import AddEmergencyContact from "./AddEmergencyContact";
import AddExperience from "./AddExperience";

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

export default function DetailEmployee() {
  const { id: employeeId } = useParams();

  const [openAddQualificationModal, setOpenAddQualificationModal] =
    useState(false);
  const handleOpenAddQualificationModal = () =>
    setOpenAddQualificationModal(true);
  const handleCloseAddQualificationModal = () =>
    setOpenAddQualificationModal(false);

  const [openAddEmergencyContactModal, setOpenAddEmergencyContactModal] =
    useState(false);
  const handleOpenAddEmergencyContactModal = () =>
    setOpenAddEmergencyContactModal(true);
  const handleCloseAddEmergencyContactModal = () =>
    setOpenAddEmergencyContactModal(false);

  const [openAddExperienceModal, setOpenAddExperienceModal] = useState(false);
  const handleOpenAddExperienceModal = () => setOpenAddExperienceModal(true);
  const handleCloseAddExperienceModal = () => setOpenAddExperienceModal(false);

  return (
    <>
      <ToastContainer />
      {/* modals */}
      <AddQualification
        employeeId={employeeId ?? ""}
        openModal={openAddQualificationModal}
        handleCloseModal={handleCloseAddQualificationModal}
      />

      <AddEmergencyContact
        employeeId={employeeId ?? ""}
        openModal={openAddEmergencyContactModal}
        handleCloseModal={handleCloseAddEmergencyContactModal}
      />

      <AddExperience
        employeeId={employeeId ?? ""}
        openModal={openAddExperienceModal}
        handleCloseModal={handleCloseAddExperienceModal}
      />

      <Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Profile
          </Typography>
        </Box>

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
                <FieldItem title="Phone" value={employee.phone} />
                <FieldItem title="Email" value={employee.email} />
                <FieldItem title="Birthday" value={employee.dateOfBirth} />
                <FieldItem title="Gender" value={employee.gender} />
                <FieldItem title="Reports To" value={employee.reportsTo} />
              </Box>
            </Grid>
          </Grid>

          <Box position="absolute" top={6} right={6}>
            <IconButton>
              <EditIcon sx={{ color: "#8e8e8e" }} />
            </IconButton>
          </Box>
        </Paper>

        {/* peronal informations & Emergeny contacts */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <PersonalInfoCard />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <EmergencyContactCard
              employeeId={employeeId}
              openAddEmergencyContactModal={handleOpenAddEmergencyContactModal}
            />
          </Grid>
        </Grid>

        {/* Education & Experience */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <QualificationsCard
              employeeId={employeeId}
              openAddQualificationModal={handleOpenAddQualificationModal}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ExperienceCard
              employeeId={employeeId}
              openAddExperienceModal={handleOpenAddExperienceModal}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}