import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import HistoryIcon from "@mui/icons-material/History";
import PaidIcon from "@mui/icons-material/Paid";

const hrsSidebarMainListItems = [
  {
    to: "/hr-dashboard/payroll/process-payroll",
    label: "Payroll",
    icon: <PaymentsIcon />,
  },
];

const hrsSidebarSettingsListItems = [
  {
    to: "/hr-dashboard/profile",
    label: "Account",
    icon: <PersonIcon />,
  },
  {
    to: "/hr-dashboard/change-password",
    label: "Password",
    icon: <LockIcon />,
  },
];

const hrsSidebarEmployeesListItems = [
  {
    to: "/hr-dashboard/employees",
    label: "Employees",
    icon: <PeopleIcon />,
  },
];

const hrSidebarSalaryRevisionsListItems = [
  {
    to: "/hr-dashboard/salary-revision",
    label: "Salary Revisions",
    icon: <HistoryIcon />,
  },
  {
    to: "/hr-dashboard/salary-revision/employee",
    label: "Employee Salary Revisions",
    icon: <PaymentsIcon />,
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
      <Link to="/hr-dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText secondary="Dashboard" />
        </ListItemButton>
      </Link>

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
          <Typography sx={{ width: "33%", flexShrink: 0 }} variant="body2">
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

      {/* Salary-Revisions */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleAccordionChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }} variant="body2">
            Salary Revision
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {hrSidebarSalaryRevisionsListItems.map((item) => (
            <Link to={item.to}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ fontSize: 10 }} secondary={item.label} />
              </ListItemButton>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>

      {hrsSidebarMainListItems.map((item) => (
        <Link to={item.to}>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText secondary={item.label} />
          </ListItemButton>
        </Link>
      ))}

      {/* Settings */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleAccordionChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }} variant="body2">
            Settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {hrsSidebarSettingsListItems.map((item) => (
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
