import React from "react";
import { Grid } from "@mui/material";
import Post from "../post/Post";

const Posts = ({ posts }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {posts.map((post) => (
        <Grid key={post.id} item>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
