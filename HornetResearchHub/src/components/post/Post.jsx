import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDistance } from "date-fns";
import NewPostModal from "../new_post/NewPostModal";
import PostMenu from "../menu/PostMenu";
import ShareMenu from "../menu/ShareMenu";
import { Outlet } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  padding: "20px",
  margin: "20px",
  width: 900,
  display: "table-cell",
  "&:hover": {
    backgroundColor: "#00000014",
  },
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

const Post = ({ post }) => {
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState(null);

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
      <StyledCard>
        <CardHeader
          avatar={<StyledAvatar src={post.user_avatar} alt={post.user_name} />}
          title={
            <Link
              href={`/posts/${post.id}`}
              underline="none"
              sx={{
                color: "inherit",
              }}
            >
              {post.title}
            </Link>
          }
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
                <PostMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
              )}
            </>
          }
        />
        <Link
          href={`/posts/${post.id}`}
          underline="none"
          sx={{
            color: "inherit",
          }}
        >
          <StyledCardContent>
            <Typography variant="body1">{post.content}</Typography>
          </StyledCardContent>
        </Link>
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
        {/* Add a new comment */}
        <NewPostModal
          openModal={newPostModalOpen}
          handleModalClose={handleNewPostModalClose}
          postType={`comment`}
          parentPost={post}
        />
      </StyledCard>
      <Outlet />
    </>
  );
};

export default Post;
