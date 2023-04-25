import React from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";

const PostMenu = ({ anchorEl, handleClose }) => {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Edit" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </MenuItem>
    </Menu>
  );
};

export default PostMenu;
