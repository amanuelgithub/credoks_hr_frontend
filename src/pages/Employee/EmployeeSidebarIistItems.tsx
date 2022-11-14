import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";

const employeesSidebarMainListItems = [
  {
    to: "/employee-dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },

  {
    to: "/employee-dashboard/profile",
    label: "Profile",
    icon: <AccountCircleIcon />,
  },
];

const employeesSidebarLeavesListItems = [
  {
    to: "/employee-dashboard/leaves/create",
    label: "Leave",
    icon: <AddIcon />,
  },
  {
    to: "/employee-dashboard/leaves",
    label: "Leaves",
    icon: <ContentPasteGoIcon />,
  },
];

export const EmployeeSidebarMainListItems = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <React.Fragment>
      {employeesSidebarMainListItems.map((item) => (
        <Link to={item.to}>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </Link>
      ))}

      {/* Leaves */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleAccordionChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Leaves</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {employeesSidebarLeavesListItems.map((item) => (
            <Link to={item.to}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export const EmployeeSidebarSecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
    </React.Fragment>
  );
};
