import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import URLTable from "../components/URLTable";
import NavBar from "../components/NavBar";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeHeaders } from "../api/helpers/headers";
import api from "../api";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  function changeData(newData) {
    setData(newData);
  }

  const handleSignOut = () => {
    removeHeaders();
    navigate("/");
  };

  useEffect(() => {
    api.url
      .getURLs()
      .then((resp) => setData(resp.payload.shortened_urls))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <NavBar data={data} change={changeData} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <URLTable data={data} change={changeData} />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSignOut}
        startIcon={<LogoutIcon />}
        sx={{
          position: "fixed",
          bottom: "2px",
          left: "2px",
          textTransform: "none",
          fontSize: "20px",
          [`@media (max-width: 768px)`]: {
            fontSize: "14px",
          },
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
