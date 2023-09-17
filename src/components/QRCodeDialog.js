import React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import QRCode from "qrcode.react";

const QRCodeDialog = ({ open, close, originalURL }) => {
  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${originalURL}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        <QRCode id="qr-gen" value={originalURL} size={290} level={"H"} />
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ fontSize: "20px" }}
          onClick={downloadQRCode}
          color="primary"
        >
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRCodeDialog;
