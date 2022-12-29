import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
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
  {
    to: "/hr-dashboard/payroll/process-payroll",
    label: "Payroll",
    icon: <PaymentsIcon />,
  },
];

const hrsSidebarEmployeesListItems = [
  {
    to: "/hr-dashboard/employees",
    label: "Employees",
    icon: <PeopleIcon />,
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
          sx={{ borderBottom: "1px solid gray" }}
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
                <ListItemText secondary={item.label} />
              </ListItemButton>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};
