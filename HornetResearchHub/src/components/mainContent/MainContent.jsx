import React from "react";
import Box from "@mui/material/Box";
import DrawerHeader from "../drawerHeader/DrawerHeader";
import { Routes, Route } from "react-router-dom";
import Home from "../../routes/home/Home";
import Login from "../../routes/login/Login";
import Register from "../../routes/register/Register";

const MainContent = () => {
  return (
    <Box component="main">
      <DrawerHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
};

export default MainContent;
