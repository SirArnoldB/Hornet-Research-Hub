import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Post from "../post/Post";

const Comments = ({ comments }) => {
  return (
    <List>
      {comments.map((comment, index) => (
        <ListItem key={index}>
          <Post post={comment} />
        </ListItem>
      ))}
    </List>
  );
};

export default Comments;
