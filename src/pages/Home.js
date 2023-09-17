import React from "react";
import { Box } from "@mui/material";
import URLTable from "../components/URLTable";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <URLTable />
      </Box>
    </div>
  );
};

export default Home;
