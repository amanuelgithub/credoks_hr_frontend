import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const hrsSidebarMainListItems = [
  {
    to: "/hr-dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    to: "/hr-dashboard/employees",
    label: "Employees",
    icon: <PeopleIcon />,
  },
];

export const HrSidebarMainListItems = () => {
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
