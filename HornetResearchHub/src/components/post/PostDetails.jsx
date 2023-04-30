import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Accordion,
  CircularProgress,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDistance } from "date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostMenu from "../menu/PostMenu";
import ShareMenu from "../menu/ShareMenu";
import { fetchComments } from "../../utils/comments/FetchComments";
import { useParams } from "react-router-dom";
import { getPostById } from "../../utils/posts/FetchPost";
import Comments from "../comments/Comments";
import NewPost from "../new_post/NewPost";
import NewPostModal from "../new_post/NewPostModal";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  padding: "20px",
  margin: "20px",
  width: 900,
  display: "flex",
  flexDirection: "column",
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey,
  marginTop: "1rem",
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  minHeight: 0,
  "& > .Mui-expanded": {
    minHeight: 0,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: 0,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: theme.spacing(2),
  "& .MuiTypography-root": {
    whiteSpace: "pre-wrap",
  },
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [isCommentsExpanded, setisCommentsExpanded] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const newPost = await getPostById(postId);

      setPost(newPost);
    };

    getPost();
  }, [postId]);

  useEffect(() => {
    const getComments = async () => {
      const postComments = await fetchComments(postId);

      setComments(postComments);
    };

    getComments();
  }, [postId]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setisCommentsExpanded(isExpanded ? panel : false);
  };

  const handleMenuClick = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    setMenuId(menuType);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(null);
  };

  const handleLikeClick = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleNewPostModalOpen = () => {
    setNewPostModalOpen(true);
  };

  const handleNewPostModalClose = () => {
    setNewPostModalOpen(false);
  };

  return (
    <>
      {post ? (
        <StyledCard>
          <>
            <CardHeader
              avatar={
                <StyledAvatar src={post.user_avatar} alt={post.user_name} />
              }
              title={post.title}
              subheader={`${formatDistance(
                new Date(post.created_at),
                new Date()
              )} ago by @${post.user_handle}`}
              action={
                <>
                  <IconButton
                    aria-label="Post Menu"
                    onClick={(event) => handleMenuClick(event, "postMenu")}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  {Boolean(anchorEl) && menuId === "postMenu" && (
                    <PostMenu
                      anchorEl={anchorEl}
                      handleClose={handleMenuClose}
                    />
                  )}
                </>
              }
            />
            <StyledCardContent>
              <Typography variant="body1">{post.content}</Typography>
            </StyledCardContent>
            <StyledCardActions disableSpacing>
              <IconButton aria-label="like" onClick={handleLikeClick}>
                <FavoriteIcon color="error" />
                <Typography variant="body2">
                  {post.likes ? post.likes : ""}
                </Typography>
              </IconButton>
              <IconButton aria-label="comment" onClick={handleNewPostModalOpen}>
                <ModeCommentIcon />
                <Typography variant="body2">
                  {post.comment_count ? post.comment_count : ""}
                </Typography>
              </IconButton>
              <IconButton aria-label="bookmark">
                <BookmarkIcon />
                <Typography variant="body2">
                  {post.saves ? post.saves : ""}
                </Typography>
              </IconButton>
              <IconButton
                aria-label="share"
                onClick={(event) => handleMenuClick(event, "shareMenu")}
              >
                <ShareIcon />
                <Typography variant="body2">
                  {post.shares ? post.shares : ""}
                </Typography>
              </IconButton>
              {Boolean(anchorEl) && menuId === "shareMenu" && (
                <ShareMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
              )}
            </StyledCardActions>
            {/* Accordion for comments */}
            <StyledAccordion
              expanded={isCommentsExpanded === "commentsPanel"}
              onChange={handleAccordionChange("commentsPanel")}
            >
              <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Comments</Typography>
              </StyledAccordionSummary>
              <StyledAccordionDetails>
                <Box
                  sx={{
                    marginLeft: 10,
                  }}
                >
                  <NewPost
                    newPostLabel={`Leave a comment...`}
                    fullWidth={false}
                    postType={`comment`}
                  />
                </Box>

                <Comments comments={comments} />
              </StyledAccordionDetails>
            </StyledAccordion>
            {/* Add a new comment */}
            <NewPostModal
              openModal={newPostModalOpen}
              handleModalClose={handleNewPostModalClose}
              postType={`comment`}
              parentPost={post}
            />
          </>
        </StyledCard>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default PostDetails;
