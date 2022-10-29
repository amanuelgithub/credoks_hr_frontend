import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

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

export const EmployeeSidebarMainListItems = () => {
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
