import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetEmployeeQuery } from "../../../services/employeeApiSlice";
import ProfileAvatar from "../../../components/ProfileAvatar";
import UploadProfileImage from "../../../components/UploadProfileImage";
import AddExperience from "../../../components/AddExperience";
import AddEmergencyContact from "../../../components/AddEmergencyContact";
import AddQualification from "../../../components/AddQualification";
import ExperienceCard from "../../../components/ExperienceCard";
import QualificationsCard from "../../../components/QualificationsCard";
import EmergencyContactCard from "../../../components/EmergencyContactCard";
import PersonalInfoCard from "../../../components/PersonalInfoCard";
import FieldItem from "../../../components/FieldItem";
import UploadCV from "../../../components/UploadCV";
import PdfViewerComponent from "../../../components/PdfViewerComponent";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function DetailEmployee() {
  const { id: employeeId } = useParams();
  const { data: employee } = useGetEmployeeQuery(employeeId);

  // profile image state
  const [profileImage, setProfileImage] = useState("");

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

  useEffect(() => {
    if (employee?.profileImage) {
      setProfileImage(employee?.profileImage);
    }
  }, [employee]);

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

      <Breadcrumbs />

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
              {/* display profile image component */}
              <ProfileAvatar profileImage={profileImage} />
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
                  {employee?.firstName} {employee?.fatherName}
                </Typography>
                {/* <Typography
                  variant="body2"
                  sx={{ color: "#8e8e8e" }}
                  className="text-center md:text-start"
                >
                  {employee?.position}
                </Typography> */}

                <Box marginY={2}>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold" }}
                    className="text-center md:text-start"
                  >
                    Employee ID : {employee?.id}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#8e8e8e" }}
                    className="text-center md:text-start"
                  >
                    {employee?.dateOfJoining}
                  </Typography>
                </Box>
                {/* upload profile image component */}
                <UploadProfileImage employeeId={employeeId ?? ""} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6} sx={{ padding: 1 }}>
              <Box marginY={4}>
                <FieldItem title="Phone" value={employee?.phone} />
                <FieldItem title="Email" value={employee?.email} />
                <FieldItem title="Birthday" value={employee?.dateOfBirth} />
                <FieldItem title="Gender" value={employee?.gender} />
                {/* <FieldItem title="Reports To" value={employee?.reportsTo} /> */}
              </Box>
            </Grid>
          </Grid>

          <Box position="absolute" top={6} right={6}>
            <IconButton>
              <EditIcon sx={{ color: "#8e8e8e" }} />
            </IconButton>
          </Box>
        </Paper>

        <Paper
          sx={{
            p: 3,
            position: "relative",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div className="pr-4 border-r-2 border-gray-400">
            <UploadCV employeeId={employeeId ?? ""} />
          </div>

          <div>
            {employee?.cv ? (
              <div className="flex justify-between items-center gap-16">
                <div>
                  {employee?.cv.length > 15 ? (
                    <div>
                      <div>{`${employee?.cv.slice(0, 15)}...pdf`}</div>
                    </div>
                  ) : (
                    employee?.cv
                  )}
                </div>
                <div className="bg-yellow-500 px-8 py-1 rounded-full border border-gray-300 text-white">
                  <Link to={`/hr-dashboard/employees/cv/${employee?.cv}`}>
                    View CV
                  </Link>
                </div>
              </div>
            ) : (
              "No CV"
            )}
          </div>
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
              // deleteEmergencyContact={function (): void {
              //   throw new Error("Function not implemented.");
              // }}
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
