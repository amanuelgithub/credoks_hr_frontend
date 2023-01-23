import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  useDeleteExperienceMutation,
  useGetExperiencesByEmployeeIdQuery,
} from "../services/experienceApiSlice";
import DeleteModal from "./DeleteModal/DeleteModal";
import ListCardHeader from "./ListCardHeader";

function ExperienceCard({
  openAddExperienceModal,
  employeeId,
}: {
  employeeId: string | undefined;
  openAddExperienceModal: any;
}) {
  // confirmation dialog/modal state controller
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = (id: string) => {
    setIdToBeDeleted(id);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const { data: experiences } = useGetExperiencesByEmployeeIdQuery(employeeId);

  const [deleteExperience] = useDeleteExperienceMutation();

  const handleDeleteExperience = (id: string) => {
    handleCloseDeleteModal();
    deleteExperience(id);
  };

  return (
    <>
      {idToBeDeleted && (
        <DeleteModal
          id={idToBeDeleted}
          name="Emergency"
          openModal={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleDelete={handleDeleteExperience}
        />
      )}

      <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
        <ListCardHeader
          headerText="Experiences"
          handleClick={openAddExperienceModal}
        />
        {experiences && (
          <>
            {experiences?.map((experience, index) => {
              return (
                <Box
                  sx={{
                    borderLeft: "2px solid #dddddd",
                    position: "relative",
                    paddingX: 2,
                    paddingBottom: 2,
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "end",
                    }}
                  >
                    <IconButton
                      onClick={() => handleOpenDeleteModal(experience.id ?? "")}
                    >
                      <DeleteIcon className="w-2 border border-gray-200 rounded-full p-1" />
                    </IconButton>
                  </Box>

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
          </>
        )}
      </Paper>
    </>
  );
}

export default ExperienceCard;
