import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const managersSidebarMainListItems = [
  {
    to: "/manager-dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
];

export const ManagerSidebarMainListItems = () => {
  return (
    <React.Fragment>
      {managersSidebarMainListItems.map((item) => (
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

export const ManagerSidebarSecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
    </React.Fragment>
  );
};
