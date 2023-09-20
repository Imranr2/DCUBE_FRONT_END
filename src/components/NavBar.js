import React, { useState } from "react";
import { Box, AppBar, Toolbar, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import api from "../api";
import QRCodeDialog from "./QRCodeDialog";
import { isValidURL } from "../utils/validateURL";

const NavBar = ({ data, change }) => {
  const [originalURL, setOriginalURL] = useState("");
  const [urlError, setUrlError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidURL(originalURL)) {
      setUrlError("Invalid url");
      return;
    } else {
      setUrlError("");
    }

    const eventName = e.nativeEvent.submitter.id;
    if (eventName === "shorten") {
      setIsLoading(true);
      api.url
        .shortenURL(originalURL)
        .then((resp) => {
          change([...data, resp.payload.shortened_url]);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setOriginalURL("");
          setIsLoading(false);
        });
      return;
    }

    if (eventName === "qr") {
      setOpen(true);
    }
  };

  const handleURLChange = (e) => {
    setOriginalURL(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        height: "175px",
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
            label="https://www.example.com"
            name="url"
            autoComplete="url"
            autoFocus
            value={originalURL}
            onChange={handleURLChange}
            error={!!urlError}
            helperText={urlError}
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
      <QRCodeDialog open={open} close={handleClose} URL={originalURL} />
    </AppBar>
  );
};

export default NavBar;
