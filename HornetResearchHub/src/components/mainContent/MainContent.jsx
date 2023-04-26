import React from "react";
import Box from "@mui/material/Box";
import DrawerHeader from "../drawerHeader/DrawerHeader";
import { Routes, Route } from "react-router-dom";
import Home from "../../routes/home/Home";
import PostDetails from "../post/PostDetails";
import UserAuth from "../../routes/auth/UserAuth";
import ProtectedRoute from "../protected_route/ProtectedRoute";
import { useSelector } from "react-redux";

const MainContent = () => {
  const user = useSelector((state) => state.user);

  console.log(user);

  return (
    <Box component="main">
      {user && <DrawerHeader />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/posts">
          <Route path=":postId">
            <Route
              index
              element={
                <ProtectedRoute>
                  <PostDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="edit"
              element={
                <ProtectedRoute>
                  <PostDetails />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="/login" element={<UserAuth view={`sign_in`} />} />
        <Route path="/register" element={<UserAuth view={`sign_up`} />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Box>
  );
};

export default MainContent;
