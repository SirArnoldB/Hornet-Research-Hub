import React from "react";
import { Grid, CircularProgress } from "@mui/material";
import Post from "../post/Post";

const Posts = ({ posts }) => {
  console.log(posts);
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid key={post.id} item>
            <Post post={post} />
          </Grid>
        ))
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Posts;
