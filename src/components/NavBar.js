import React, { useState } from "react";
import { Box, AppBar, Toolbar, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import api from "../api";
import QRCodeDialog from "./QRCodeDialog";

const NavBar = ({ data, change }) => {
  const [URL, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventName = e.nativeEvent.submitter.id;
    if (eventName === "shorten") {
      setIsLoading(true);
      api.url
        .shortenURL(URL)
        .then((resp) => {
          change([...data, resp.payload.shortened_url]);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setURL("");
          setIsLoading(false);
        });
      return;
    }

    if (eventName === "qr") {
      setOpen(true);
    }
  };

  const handleURLChange = (e) => {
    setURL(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        height: "150px",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="url"
            label="Enter URL here..."
            name="url"
            autoComplete="url"
            autoFocus
            value={URL}
            onChange={handleURLChange}
            sx={{ backgroundColor: "white", borderRadius: "4px" }}
          />
          <Box display="flex" gap="10px">
            <LoadingButton
              variant="contained"
              color="secondary"
              type="submit"
              id="shorten"
              loading={isLoading}
              sx={{
                textTransform: "none",
                fontSize: "20px",
                [`@media (max-width: 768px)`]: {
                  fontSize: "14px",
                },
              }}
            >
              Shorten URL
            </LoadingButton>
            <LoadingButton
              variant="contained"
              type="submit"
              id="qr"
              sx={{
                backgroundColor: "white",
                color: "black",
                textTransform: "none",
                fontSize: "20px",
                [`@media (max-width: 768px)`]: {
                  fontSize: "14px",
                },
                ":hover": { backgroundColor: "#ccc" },
              }}
            >
              Generate QR Code
            </LoadingButton>
          </Box>
        </form>
      </Toolbar>
      <QRCodeDialog open={open} close={handleClose} URL={URL} />
    </AppBar>
  );
};

export default NavBar;
