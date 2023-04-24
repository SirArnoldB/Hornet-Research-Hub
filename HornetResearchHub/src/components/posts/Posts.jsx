import React, { useEffect, useState } from "react";
import { Grid, Divider } from "@mui/material";
import Post from "../post/Post";
import supabase from "../../services/supabase/supabaseClient";

const Posts = ({ posts }) => {
  return (
    <Grid>
      {posts.map((post) => (
        <Grid key={post.id} item>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
