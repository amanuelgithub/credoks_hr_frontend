import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GradingIcon from "@mui/icons-material/Grading";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";

const adminSidebarMainListItems = [
  { to: "/admin-dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  {
    to: "/admin-dashboard/companies",
    label: "Companies",
    icon: <BusinessIcon />,
  },
  {
    to: "/admin-dashboard/departments",
    label: "Departments",
    icon: <GroupsIcon />,
  },
  {
    to: "/admin-dashboard/locations",
    label: "Locations",
    icon: <LocationOnIcon />,
  },
  {
    to: "/admin-dashboard/employees",
    label: "Employees",
    icon: <PeopleIcon />,
  },
  {
    to: "/admin-dashboard/positions",
    label: "Positions",
    icon: <GradingIcon />,
  },
];

export const AdminSidebarMainListItems = () => {
  return (
    <React.Fragment>
      {adminSidebarMainListItems.map((item) => (
        <Link to={item.to}>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </Link>
      ))}
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
