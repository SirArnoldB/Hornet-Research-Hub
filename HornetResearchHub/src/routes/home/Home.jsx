import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Posts from "../../components/posts/Posts";
import NewPost from "../../components/newPost/NewPost";
import { fetchPosts } from "../../utils/posts/FetchPosts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const newPosts = await fetchPosts();

      setPosts(newPosts);
    };

    getPosts();
  }, []);

  return (
    <Box>
      <NewPost newPostLabel={`What's on your mind`} fullWidth={true} />
      <Posts posts={posts} />
    </Box>
  );
};

export default Home;
