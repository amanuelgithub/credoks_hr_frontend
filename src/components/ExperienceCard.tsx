import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useGetExperiencesByEmployeeIdQuery } from "../services/experienceApiSlice";
import ListCardHeader from "./ListCardHeader";

// const experiences = [
//   {
//     jobTitle: "Software Engieer",
//     companyName: "Credoks Digital",
//     from: "2015",
//     to: "2022",
//   },
// ];

function ExperienceCard({
  openAddExperienceModal,
  employeeId,
}: {
  employeeId: string | undefined;
  openAddExperienceModal: any;
}) {
  const { data: experiences } = useGetExperiencesByEmployeeIdQuery(employeeId);

  useEffect(() => {
    console.log("experiences", experiences);
  }, []);

  return (
    <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
      <ListCardHeader
        headerText="Experiences"
        handleClick={openAddExperienceModal}
      />

      {experiences?.map((experience, index) => {
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
    </Paper>
  );
}

export default ExperienceCard;
