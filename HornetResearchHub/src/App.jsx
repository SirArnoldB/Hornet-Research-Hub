import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import SideNav from "./components/sideNav/SideNav";
import Box from "@mui/material/Box";
import MainContent from "./components/mainContent/MainContent";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <div className="App">
        <Box sx={{ display: "flex" }}>
          {user && <SideNav />} <MainContent />
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
