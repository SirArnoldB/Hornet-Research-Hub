import React, { useState, useEffect, Suspense } from "react";
import { Box, Tab, CircularProgress, Typography } from "@mui/material";
import Posts from "../../components/posts/Posts";
import NewPost from "../../components/new_post/NewPost";
import { fetchPosts } from "../../utils/posts/FetchPosts";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import GroupsIcon from "@mui/icons-material/Groups";
import ArticleIcon from "@mui/icons-material/Article";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Chip from "@mui/material/Chip";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedChip, setSelectedChip] = useState("latest");

  const sortPosts = () => {
    switch (sortOption) {
      case "latest":
        return [...posts].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      case "likes":
        return [...posts].sort((a, b) => b.likes - a.likes);
      case "comments":
        return [...posts].sort((a, b) => b.comment_count - a.comment_count);
      default:
        return posts;
    }
  };

  const handleChipClick = (option) => {
    setSelectedChip(option);
    setSortOption(option);
  };

  useEffect(() => {
    const getPosts = async () => {
      const newPosts = await fetchPosts();

      setPosts(newPosts);
    };

    getPosts();
  }, []);

  const sortedPosts = sortPosts(posts, sortOption);

  const HomePosts = ({ category }) => {
    return (
      <Box>
        <NewPost
          newPostLabel={`What's on your mind`}
          fullWidth={true}
          postType={`post`}
        />
        <Posts category={category} posts={sortedPosts} />
      </Box>
    );
  };

  const HomeTabs = () => {
    const [value, setValue] = useState("all");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="Hornet Research Hub Home Tabs"
            >
              <Tab
                icon={<AllInboxIcon />}
                iconPosition="start"
                label="All"
                value="all"
              />

              <Tab
                icon={<QuestionAnswerIcon />}
                iconPosition="start"
                label="Questions"
                value="question"
              />

              <Tab
                icon={<TipsAndUpdatesIcon />}
                iconPosition="start"
                label="Opportunities"
                value="opportunity"
              />

              <Tab
                icon={<ArticleIcon />}
                iconPosition="start"
                label="Articles"
                value="article"
              />

              <Tab
                icon={<GroupsIcon />}
                iconPosition="start"
                label="Need a Mentor"
                value="need-a-mentor"
              />

              <Tab
                icon={<WorkspacesIcon />}
                iconPosition="start"
                label="Collaboration"
                value="collaboration"
              />
            </TabList>
          </Box>
          <Suspense fallback={<CircularProgress />}>
            <TabPanel value="all">
              <HomePosts category={null} />
            </TabPanel>
            <TabPanel value="question">
              <HomePosts category={value} />
            </TabPanel>
            <TabPanel value="opportunity">
              <HomePosts category={value} />
            </TabPanel>
            <TabPanel value="article">
              <HomePosts category={value} />
            </TabPanel>
            <TabPanel value="need-a-mentor">
              <HomePosts category={value} />
            </TabPanel>
            <TabPanel value="collaboration">
              <HomePosts category={value} />
            </TabPanel>
          </Suspense>
        </TabContext>
      </Box>
    );
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" marginBottom={3}>
        <Typography variant="subtitle1" gutterBottom>
          Sort By:
        </Typography>
        <Chip
          label="Latest"
          clickable
          onClick={() => handleChipClick("latest")}
          color={selectedChip === "latest" ? "success" : "default"}
          sx={{ marginLeft: 3 }}
        />
        <Chip
          label="Likes"
          clickable
          onClick={() => handleChipClick("likes")}
          color={selectedChip === "likes" ? "success" : "default"}
          sx={{ marginLeft: 3 }}
        />
        <Chip
          label="Comments"
          clickable
          onClick={() => handleChipClick("comments")}
          color={selectedChip === "comments" ? "success" : "default"}
          sx={{ marginLeft: 3 }}
        />
      </Box>
      <HomeTabs />
    </Box>
  );
};

export default Home;
