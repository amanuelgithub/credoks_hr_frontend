import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import {
  useDeleteEmergencyContactMutation,
  useGetEmergencyContactByEmployeeIdQuery,
} from "../services/emergencyContactApiSlice";
import FieldItem from "./FieldItem";
import ListCardHeader from "./ListCardHeader";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import DeleteModal from "./DeleteModal/DeleteModal";

function EmergencyContactCard({
  employeeId,
  openAddEmergencyContactModal,
}: {
  employeeId: string | undefined;
  openAddEmergencyContactModal: any;
}) {
  // confirmation dialog/modal state controller
  const [idToBeDeleted, setIdToBeDeleted] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = (id: string) => {
    setIdToBeDeleted(id);
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const { data: emergencyContacts } =
    useGetEmergencyContactByEmployeeIdQuery(employeeId);

  const [deleteEmergencyContact] = useDeleteEmergencyContactMutation();

  const handleDeleteEmergencyContact = (id: string) => {
    handleCloseDeleteModal();
    deleteEmergencyContact(id);
  };

  return (
    <>
      {idToBeDeleted && (
        <DeleteModal
          id={idToBeDeleted}
          name="Emergency Contact"
          openModal={openDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleDelete={handleDeleteEmergencyContact}
        />
      )}

      <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
        <ListCardHeader
          headerText="Emergency Contacts"
          handleClick={openAddEmergencyContactModal}
        />

        {emergencyContacts && (
          <Box marginY={3}>
            {emergencyContacts?.map((emergencyContact, index) => {
              return (
                <Box className="relative" key={index}>
                  <Box>
                    <FieldItem
                      title="First Name"
                      value={emergencyContact.firstName}
                    />
                    <FieldItem
                      title="Last Name"
                      value={emergencyContact.lastName}
                    />
                    <FieldItem title="Phone" value={emergencyContact.phone} />
                    <FieldItem
                      title="Relation"
                      value={emergencyContact.relation}
                    />
                  </Box>

                  <Box className="absolute top-3 right-0 ">
                    {/* <IconButton>
                    <EditIcon className="w-2 border border-gray-200 rounded-full p-1" />
                  </IconButton> */}

                    {/* <IconButton onClick={deleteEmergencyContact}> */}
                    <IconButton
                      onClick={() =>
                        handleOpenDeleteModal(emergencyContact.id ?? "")
                      }
                    >
                      <DeleteIcon className="w-2 border border-gray-200 rounded-full p-1" />
                    </IconButton>
                  </Box>
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
        )}
      </Paper>
    </>
  );
}

export default EmergencyContactCard;
