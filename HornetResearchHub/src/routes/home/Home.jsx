import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Posts from "../../components/posts/Posts";
import supabase from "../../services/supabase/supabaseClient";
import NewPost from "../../components/newPost/NewPost";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select("*")
        .is("parent_post_id", null);

      console.log(posts);
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  return (
    <Box>
      <NewPost />
      <Posts posts={posts} />
    </Box>
  );
};

export default Home;
