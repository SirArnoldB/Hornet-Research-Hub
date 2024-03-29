import React, { useState, useRef } from "react";
import { Box, TextField } from "@mui/material";
import NewPostModal from "./NewPostModal";

const NewPost = ({ newPostLabel, fullWidth, postType, parentPost }) => {
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
      <NewPostModal
        openModal={openModal}
        handleModalClose={handleModalClose}
        postType={postType}
        parentPost={parentPost}
      />
    </Box>
  );
};

export default NewPost;
