import React from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import Post from "../post/Post";

const NoPostsMessage = () => (
  <Typography variant="h6" align="center" gutterBottom>
    No posts to display.
  </Typography>
);

const Posts = ({ posts, category }) => {
  const filterPostsByCategory = (posts, category) => {
    if (category) {
      return posts.filter((post) => post.category === category);
    }
    return posts;
  };

  const filteredPosts = filterPostsByCategory(posts, category);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {filteredPosts && filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Grid key={post.id} item>
            <Post post={post} />
          </Grid>
        ))
      ) : filteredPosts ? (
        <NoPostsMessage />
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Posts;
