import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListSubheader from "@mui/material/ListSubheader";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";

const hrsSidebarMainListItems = [
  {
    to: "/hr-dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
];

const hrsSidebarEmployeesListItems = [
  {
    to: "/hr-dashboard/employees/add",
    label: "Employee",
    icon: <AddIcon />,
  },
  {
    to: "/hr-dashboard/employees",
    label: "Employees",
    icon: <PeopleIcon />,
  },
];

const hrsSidebarLeaveListItems = [
  {
    to: "/hr-dashboard/leaves",
    label: "Leaves",
    icon: <ContentPasteGoIcon />,
  },
];

export const HrSidebarMainListItems = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <React.Fragment>
      {hrsSidebarMainListItems.map((item) => (
        <Link to={item.to}>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </Link>
      ))}

      {/* Employees */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleAccordionChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Employees
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {hrsSidebarEmployeesListItems.map((item) => (
            <Link to={item.to}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>

      {/* Leaves */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleAccordionChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Leaves</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {hrsSidebarLeaveListItems.map((item) => (
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

export const HrSidebarSecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
    </React.Fragment>
  );
};
