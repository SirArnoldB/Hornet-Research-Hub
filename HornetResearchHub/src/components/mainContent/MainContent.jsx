import React from "react";
import Box from "@mui/material/Box";
import DrawerHeader from "../drawerHeader/DrawerHeader";
import { Routes, Route } from "react-router-dom";
import Home from "../../routes/home/Home";
import Login from "../../routes/login/Login";
import Register from "../../routes/register/Register";
import PostDetails from "../post/PostDetails";

const MainContent = () => {
  return (
    <Box component="main">
      <DrawerHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts">
          <Route path=":postId">
            <Route index element={<PostDetails />} />
            <Route path="edit" element={<PostDetails />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
};

export default MainContent;
