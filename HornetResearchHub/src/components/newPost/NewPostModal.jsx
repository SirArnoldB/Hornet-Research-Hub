import React, { useState, useRef } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const NewPostModal = ({ openModal, handleModalClose }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
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
            <TextField
              id="post-title"
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={handleTitleChange}
            />
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
