import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import supabase from "../../services/supabase/supabaseClient";
import { useSelector } from "react-redux";

const NewPostModal = ({
  openModal,
  handleModalClose,
  postType,
  parentPost,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      user_id: user.id,
      title: title,
      content: text,
    };
    if (postType === "comment") {
      newPost.parent_post_id = parentPost.id;
    }

    const { error } = await supabase.rpc("create_post", {
      new_post: JSON.stringify(newPost),
      typeCasts: {
        new_post: "jsonb",
      },
    });
    if (error) {
      console.error(error);
    }

    handleModalClose();
  };

  return (
    <Box>
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            New Post
          </Typography>
          <form onSubmit={handleSubmit}>
            {postType === "post" && (
              <TextField
                id="post-title"
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={title}
                onChange={handleTitleChange}
              />
            )}
            <TextareaAutosize
              id="post-text"
              placeholder="What's on your mind?"
              minRows={5}
              maxRows={15}
              value={text}
              onChange={handleTextChange}
              style={{
                width: "100%",
                padding: "12px 20px",
                boxSizing: "border-box",
                backgroundColor: "white",
                color: "black",
                borderWidth: 0.1,
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleModalClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Post
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default NewPostModal;
