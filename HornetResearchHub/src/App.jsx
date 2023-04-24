import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import SideNav from "./components/sideNav/SideNav";
import Box from "@mui/material/Box";
import MainContent from "./components/mainContent/MainContent";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Box sx={{ display: "flex" }}>
          <SideNav />
          <MainContent />
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
