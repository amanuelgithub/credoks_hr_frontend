import * as React from "react";
import PeopleIcon from "@mui/icons-material/People";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LockIcon from "@mui/icons-material/Lock";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import { Link } from "react-router-dom";

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
    to: "/manager-dashboard/departments",
    label: "Departments",
    icon: <GroupsIcon />,
  },
  {
    to: "/manager-dashboard/positions",
    label: "Positions",
    icon: <AssignmentIndIcon />,
  },
  {
    to: "/manager-dashboard/change-password",
    label: "Change Password",
    icon: <LockIcon />,
  },
];

export const ManagerSidebarMainListItems = () => {
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
    </React.Fragment>
  );
};

export const ManagerSidebarSecondaryListItems = () => {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        reports
      </ListSubheader>
    </React.Fragment>
  );
};
