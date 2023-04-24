import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import RepeatIcon from "@mui/icons-material/Repeat";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import LinkIcon from "@mui/icons-material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDistance } from "date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledCard = styled(Card)(({ theme }) => ({
  // The card will have a link
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  padding: "20px",
  margin: "20px",
  width: 900,
  display: "flex",
  flexDirection: "column",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  paddingBottom: 0,
  "& .MuiCardHeader-title": {
    fontWeight: theme.typography.fontWeightBold,
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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "auto",
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  margin: 0,
  "& .MuiTypography-root": {
    fontSize: theme.typography.fontSize,
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    minWidth: 400,
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  paddingBottom: 0,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  paddingTop: 0,
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  paddingTop: 0,
}));

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [isCommentsExpanded, setisCommentsExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setisCommentsExpanded(isExpanded ? panel : false);
  };

  console.log(post);

  const handleLikeClick = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleCommentDialogOpen = () => {
    setIsCommentDialogOpen(true);
  };

  const handleCommentDialogClose = () => {
    setIsCommentDialogOpen(false);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newComment = {
      id: comments.length + 1,
      content: formData.get("content"),
      user: {
        name: "John Doe",
        username: "johndoe",
      },
      createdAt: new Date(),
    };
    setComments((prevComments) => [...prevComments, newComment]);
    handleCommentDialogClose();
  };

  return (
    <StyledCard>
      <CardHeader
        avatar={<StyledAvatar src={post.user_avatar} alt={post.user_name} />}
        title={post.title}
        subheader={`${formatDistance(
          new Date(post.created_at),
          new Date()
        )} ago by @${post.user_handle}`}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
      <StyledCardContent>
        <Typography variant="body1">{post.content}</Typography>
      </StyledCardContent>
      <StyledCardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLikeClick}>
          <FavoriteIcon color="error" />
          <Typography variant="body2">{likes}</Typography>
        </IconButton>
        <IconButton aria-label="comment" onClick={handleCommentDialogOpen}>
          <ModeCommentIcon />
          <Typography variant="body2">{post.comment_count}</Typography>
        </IconButton>
        <IconButton aria-label="repost">
          <RepeatIcon /> <Typography variant="body2">{post.reposts}</Typography>
        </IconButton>
        <IconButton aria-label="bookmark">
          <BookmarkIcon /> <Typography variant="body2">{post.saves}</Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon /> <Typography variant="body2">{post.shares}</Typography>
        </IconButton>
      </StyledCardActions>
      {/* Comment Dialog */}
      <StyledDialog
        open={isCommentDialogOpen}
        onClose={handleCommentDialogClose}
      >
        <form onSubmit={handleCommentSubmit}>
          <StyledDialogTitle>Add a Comment</StyledDialogTitle>
          <StyledDialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="content"
              label="Comment"
              fullWidth
              multiline
              rows={4}
            />
          </StyledDialogContent>
          <StyledDialogActions>
            <Button onClick={handleCommentDialogClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </StyledDialogActions>
        </form>
      </StyledDialog>
    </StyledCard>
  );
};

export default Post;

// const Post = ({ post }) => {
//   const [expanded, setExpanded] = useState(false);

//   const handleAccordionChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Card
//       sx={{
//         padding: "20px",
//         margin: "20px",
//         width: 900,
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <StyledCardContent
//         sx={{
//           marginBottom: "1rem",
//         }}
//       >
//         <Typography gutterBottom variant="h5">
//           {post.title}
//         </Typography>
//         <Typography color="textSecondary" component="p">
//           {post.content}
//         </Typography>
//       </StyledCardContent>
//       <Divider />
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <ThumbUpAltIcon />
//         </IconButton>
//       </CardActions>
//       {/* Accordion for comments */}
//       <StyledAccordion
//         expanded={expanded === "commentsPanel"}
//         onChange={handleAccordionChange("commentsPanel")}
//       >
//         <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography>Comments</Typography>
//         </StyledAccordionSummary>
//         <StyledAccordionDetails>
//           <List>
//             {post.comments.map((comment) => (
//               <ListItem key={comment.id}>
//                 <ListItemText primary={comment.content} />
//               </ListItem>
//             ))}
//           </List>
//         </StyledAccordionDetails>
//       </StyledAccordion>
//     </Card>
//   );
// };

// export default Post;

// const Post = ({ post }) => {
//   console.log(post);
//   return (
//     <Card
//       sx={{
//         backgroundColor: "#d6f5d6",
//         padding: "20px",
//         margin: "20px",
//         border: "1px solid #28a745",
//         minWidth: 900,
//       }}
//     >
//       <CardHeader
//         title={post.title}
//         subheader={`Created at: \${post.created_at} | Upvotes: \${post.upvotes}`}
//       />
//       {post.tags.length > 0 && <Tags tags={post.tags} />}
//       <CardContent>
//         <Typography variant="body1">{post.content}</Typography>
//         <Comments comments={post.comments} />
//       </CardContent>
//     </Card>
//   );
// };

// export default Post;
