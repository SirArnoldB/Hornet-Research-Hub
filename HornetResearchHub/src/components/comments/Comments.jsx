import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Post from "../post/Post";

const Comments = ({ comments }) => {
  return (
    <List>
      {comments.map((comment) => (
        <ListItem key={comment.id}>
          <Post post={comment} />
        </ListItem>
      ))}
    </List>
  );
};

export default Comments;
