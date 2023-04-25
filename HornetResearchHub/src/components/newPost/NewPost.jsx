import React, { useState, useRef } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import NewPostModal from "./NewPostModal";

const NewPost = ({ newPostLabel, fullWidth }) => {
  const [openModal, setOpenModal] = useState(false);
  const textFieldRef = useRef(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <TextField
        id="new-post-text"
        label={newPostLabel}
        variant="standard"
        multiline
        fullWidth={fullWidth ? true : false}
        onClick={handleOpenModal}
        inputRef={textFieldRef}
        sx={{
          mb: 5,
        }}
      />
      <NewPostModal openModal={openModal} handleModalClose={handleModalClose} />
    </Box>
  );
};

export default NewPost;
