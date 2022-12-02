import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { useGetEmergencyContactByEmployeeIdQuery } from "../../../../services/emergencyContactApiSlice";
import FieldItem from "./FieldItem";
import ListCardHeader from "./ListCardHeader";

function EmergencyContactCard({
  employeeId,
  openAddEmergencyContactModal,
}: {
  employeeId: string | undefined;
  openAddEmergencyContactModal: any;
}) {
  const { data: emergencyContacts } =
    useGetEmergencyContactByEmployeeIdQuery(employeeId);

  return (
    <Paper sx={{ marginY: 6, padding: 1, position: "relative" }}>
      <ListCardHeader
        headerText="Emergency Contacts"
        handleClick={openAddEmergencyContactModal}
      />

      {emergencyContacts && (
        <Box marginY={3}>
          {emergencyContacts?.map((emergencyContact, index) => {
            return (
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
                <FieldItem title="Relation" value={emergencyContact.relation} />

                <Divider
                  sx={{
                    display: `${
                      index === emergencyContacts.length - 1 ? "none" : "hidden"
                    }`,
                  }}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Paper>
  );
}

export default EmergencyContactCard;
