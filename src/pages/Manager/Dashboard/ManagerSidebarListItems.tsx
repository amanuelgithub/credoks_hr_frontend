import * as React from "react";
import PeopleIcon from "@mui/icons-material/People";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LockIcon from "@mui/icons-material/Lock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";

const managersSidebarMainListItems = [
  {
    to: "/manager-dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    to: "/manager-dashboard/employees",
    label: "Employees",
    icon: <PeopleIcon />,
  },
  {
    to: "/manager-dashboard/positions",
    label: "Positions",
    icon: <AssignmentIndIcon />,
  },
  {
    to: "/manager-dashboard/change-password",
    label: "Password",
    icon: <LockIcon />,
  },
];

export const ManagerSidebarMainListItems = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <React.Fragment>
      {managersSidebarMainListItems.map((item) => (
        <Link to={item.to}>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText secondary={item.label} />
          </ListItemButton>
        </Link>
      ))}

      {/* Departments */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ borderBottom: "1px solid gray" }}
        >
          <Box display={"flex"} gap={4}>
            <GroupsIcon />

            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Departments
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "f7f7f7" }}>
          {/* all Departments */}
          <Link to="/manager-dashboard/departments">
            <ListItemButton>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText secondary="Departments" />
            </ListItemButton>
          </Link>

          {/* assign-department head */}
          <Link to="/manager-dashboard/departments/assign-depart-head">
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText secondary="Assign Depart Head" />
            </ListItemButton>
          </Link>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};
