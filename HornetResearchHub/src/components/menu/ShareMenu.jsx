import React from "react";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ChatIcon from "@mui/icons-material/Chat";

const ShareMenu = ({ anchorEl, handleClose }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary="Copy link to Post" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Share via Chat" />
      </MenuItem>
    </Menu>
  );
};

export default ShareMenu;
