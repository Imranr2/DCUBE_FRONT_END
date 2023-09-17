import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import URLTable from "../components/URLTable";
import NavBar from "../components/NavBar";
import api from "../api";

const Home = () => {
  const [data, setData] = useState([]);

  function changeData(newData) {
    setData(newData);
  }

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
    </div>
  );
};

export default Home;
