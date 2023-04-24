import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const NewPost = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
    handleClose();
  };

  return (
    <Box>
      <TextField
        id="new-post-text"
        label="Whats on your mind?"
        variant="outlined"
        multiline
        fullWidth
        onClick={handleOpen}
      />
      <Modal open={open} onClose={handleClose}>
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
            <TextField
              id="post-title"
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={handleTitleChange}
            />
            <TextField
              id="post-text"
              label="Text"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={text}
              onChange={handleTextChange}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleClose} sx={{ mr: 1 }}>
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

export default NewPost;
