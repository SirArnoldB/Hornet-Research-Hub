import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import DrawerHeader from "../drawerHeader/DrawerHeader";
import { Outlet } from "react-router-dom";
import Link from "@mui/material/Link";
import TopBar from "../topBar/TopBar";
import NewPostModal from "../newPost/NewPostModal";

export const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNewPostModalOpen = () => {
    setNewPostModalOpen(true);
  };

  const handleNewPostModalClose = () => {
    setNewPostModalOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <TopBar
        handleDrawerOpen={handleDrawerOpen}
        isOpen={open}
        AppBar={AppBar}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {["Home", "Chat", "Bookmarks", "Community"].map((text, index) => (
            <Link
              href={index === 0 ? "/" : index == 1 ? "/chat" : "/Bookmarks"}
              key={text}
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&:hover": {
                  color: "#28a745",
                  textDecoration: "none",
                },
              }}
            >
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#28a745",
                    }}
                  >
                    {index === 0 ? (
                      <HomeIcon />
                    ) : index == 1 ? (
                      <AddCircleOutlineIcon />
                    ) : (
                      <Diversity2Icon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <Divider />
          <List>
            <ListItem onClick={handleNewPostModalOpen}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="New" />
            </ListItem>
          </List>
          <Divider />
          <NewPostModal
            openModal={newPostModalOpen}
            handleModalClose={handleNewPostModalClose}
            postType={`post`}
            parentPost={null}
          />
        </List>
      </Drawer>
      <Outlet />
    </>
  );
}
