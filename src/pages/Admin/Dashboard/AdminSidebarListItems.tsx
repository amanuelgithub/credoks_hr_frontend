import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
import GradingIcon from "@mui/icons-material/Grading";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UploadIcon from "@mui/icons-material/Upload";

export const AdminSidebarMainListItems = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <React.Fragment>
      <Link to="/admin-dashboard">
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      {/* Companies */}
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Companies
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "f7f7f7" }}>
          {/* all companies */}
          <Link to="/admin-dashboard/companies">
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText secondary="Companies" />
            </ListItemButton>
          </Link>

          {/* update company logo */}
          <Link to="/admin-dashboard/companies/upload-logo">
            <ListItemButton>
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText secondary="Upload Logo" />
            </ListItemButton>
          </Link>
        </AccordionDetails>
      </Accordion>

      {/* Departmnets */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ borderBottom: "1px solid gray" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Departments
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "f7f7f7" }}>
          <Link to="/admin-dashboard/departments">
            <ListItemButton>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText secondary="Departments" />
            </ListItemButton>
          </Link>
        </AccordionDetails>
      </Accordion>

      {/* Locations */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ borderBottom: "1px solid gray" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Locations
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "f7f7f7" }}>
          <Link to="/admin-dashboard/locations">
            <ListItemButton>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText secondary="Locations" />
            </ListItemButton>
          </Link>
        </AccordionDetails>
      </Accordion>

      {/* Employees */}
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
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
        <AccordionDetails sx={{ bgcolor: "f7f7f7" }}>
          <Link to="/admin-dashboard/employees">
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText secondary="Employees" />
            </ListItemButton>
          </Link>
        </AccordionDetails>
      </Accordion>

      {/* Positions */}
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ borderBottom: "1px solid gray" }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Positions
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: "f7f7f7" }}>
          <Link to="/admin-dashboard/positions">
            <ListItemButton>
              <ListItemIcon>
                <GradingIcon />
              </ListItemIcon>
              <ListItemText secondary="Positions" />
            </ListItemButton>
          </Link>
        </AccordionDetails>
      </Accordion>

      <Link to="/admin-dashboard/change-password">
        <ListItemButton>
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText secondary="Change Password" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};

export const AdminSidebarSecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
    </React.Fragment>
  );
};
