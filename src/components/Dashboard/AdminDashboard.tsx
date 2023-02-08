import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Outlet } from "react-router-dom";
import Copyright from "../Copyright";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import ProfileAvatar from "../ProfileAvatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useGetCompanyQuery } from "../../services/companyApiSlice";
import { AdminSidebarMainListItems } from "../../pages/Admin/Dashboard/AdminSidebarListItems";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent({ children }: { children: any }) {
  const [appbarOpen, setAppbarOpen] = useState(true);
  const toggleDrawer = () => {
    setAppbarOpen(!appbarOpen);
  };

  const [appbarDropdownOpen, setAppbarDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();

  const firstName = useAppSelector((state) => state.auth.firstName);
  const profileImage = useAppSelector((state) => state.auth.profileImage);

  useEffect(() => {
    console.log("proffile img from dashboard: ", profileImage);
  }, [profileImage]);

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleAppBarDropdown = (e: any) => {
    e.preventDefault();
    setAppbarDropdownOpen(!appbarDropdownOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={appbarOpen}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(appbarOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Admin Dashboard
          </Typography>
          <Box>
            {/* <IconButton color="inherit" sx={{ mr: 1.5 }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton color="inherit" sx={{ mr: 1.5 }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton> */}

            {/* logged-in user first & last name */}
          </Box>
          <Box sx={{ mr: 1.5 }}>
            <Typography>{firstName}</Typography>
          </Box>

          <Box sx={{ position: "relative" }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: 8 }}
              onClick={handleAppBarDropdown}
            >
              {profileImage ? (
                <ProfileAvatar
                  width={30}
                  height={30}
                  profileImage={profileImage}
                />
              ) : (
                <ProfileAvatar width={30} height={30} />
              )}
            </Button>
            {/* profile dropdown */}
            <Paper
              sx={{
                position: "absolute",
                bottom: "-100",
                right: 0,
                width: 240,
                p: 1,
                boxShadow: 8,
                display: appbarDropdownOpen ? "block" : "none",
              }}
            >
              <Box>
                {/* logout */}
                <Box
                  color="inherit"
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 1,
                    px: 2,
                    cursor: "pointer",
                  }}
                  onClick={handleLogout}
                >
                  <LogoutIcon />
                  <Typography>Logout</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={appbarOpen}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{children}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#f7f7f7"
              : theme.palette.grey[900],
          // ? theme.palette.grey[100]
          // : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}

export default function AdminDashboard() {
  const companyId = useAppSelector((state) => state.auth.companyId);

  const { data } = useGetCompanyQuery(companyId);

  return (
    <DashboardContent>
      <AdminSidebarMainListItems />
    </DashboardContent>
  );
}
