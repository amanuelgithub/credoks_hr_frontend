import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IQualification } from "../models/IQualification";
import { useGetQualificationsByEmployeeIdQuery } from "../services/qualificationApiSlice";
import ListCardHeader from "./ListCardHeader";

const QualificationListItem = ({
  qualification,
}: {
  qualification: IQualification;
}) => {
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

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: "normal",
            color: "#8e8e8e",
          }}
        >
          {new Date(qualification.educationStartedYear).getFullYear()}
        </Typography>
        {" - "}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: "normal",
            color: "#8e8e8e",
          }}
        >
          {new Date(qualification.educationEndedYear).getFullYear()}
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
};

export default function QualificationsCard({
  openAddQualificationModal,
  employeeId,
}: {
  employeeId: string | undefined;
  openAddQualificationModal: any;
}) {
  const { data: qualifications } =
    useGetQualificationsByEmployeeIdQuery(employeeId);

  return (
    <Paper sx={{ marginY: 6, padding: 1 }}>
      <ListCardHeader
        headerText="Education Information"
        handleClick={openAddQualificationModal}
      />

      {qualifications?.map((qualification, index) => {
        return (
          <QualificationListItem
            key={qualification.education}
            qualification={qualification}
          />
        );
      })}
    </Paper>
  );
}
