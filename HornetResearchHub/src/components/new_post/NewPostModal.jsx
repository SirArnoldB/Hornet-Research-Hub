import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import supabase from "../../services/supabase/supabaseClient";
import { useAuth } from "../../contexts/Auth";

const NewPostModal = ({
  openModal,
  handleModalClose,
  postType,
  parentPost = null,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState(null);
  const { user } = useAuth();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (postType === "post" && category === "") {
      alert("Please select a category.");
      return;
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        title: title,
        content: text,
        category: category ? category : null,
        parent_post_id: parentPost ? parentPost.id : null,
      },
    ]);

    if (error) {
      alert("Error creating new post: ", error);
    } else {
      alert("Successfully created Post");
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
              <>
                <FormControl required>
                  <FormLabel id="category">Category</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="category Options"
                    name="category-options"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                    <FormControlLabel
                      value="question"
                      control={<Radio />}
                      label="Question"
                    />
                    <FormControlLabel
                      value="opportunity"
                      control={<Radio />}
                      label="Opportunity"
                    />
                    <FormControlLabel
                      value="article"
                      control={<Radio />}
                      label="Article"
                    />
                    <FormControlLabel
                      value="need-a-mentor"
                      control={<Radio />}
                      label="Need A Mentor"
                    />
                    <FormControlLabel
                      value="collaboration"
                      control={<Radio />}
                      label="Collaboration"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  id="post-title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={title}
                  onChange={handleTitleChange}
                />
              </>
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
