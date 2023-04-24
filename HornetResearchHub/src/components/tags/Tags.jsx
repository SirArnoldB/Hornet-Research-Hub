import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Tags = ({ tags }) => {
  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Chip label={tag.name} variant="outlined" />
      ))}
    </Stack>
  );
};

export default Tags;
