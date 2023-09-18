import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeIcon from "@mui/icons-material/QrCode";
import api from "../api";
import { LoadingButton } from "@mui/lab";
import QRCodeDialog from "./QRCodeDialog";

const URLTable = ({ data, change }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [QRDialogOpen, setQRDialogOpen] = useState(false);

  const handleClickDelete = (row) => {
    setSelectedRow(row);
    setDeleteConfirmationOpen(true);
  };

  const handleClickQR = (row) => {
    setSelectedRow(row);
    setQRDialogOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleCloseQRDialog = () => {
    setQRDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    setIsLoading(true);
    api.url
      .deleteURL(selectedRow.id)
      .then(() => {
        change(data.filter((url) => url.id !== selectedRow.id));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setDeleteConfirmationOpen(false);
      });
  };

  const handleRedirect = (shortened) => {
    api.url
      .redirect(shortened)
      .then((resp) => {
        window.location.replace(resp.payload.original);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <TableContainer style={{ maxHeight: "70vh", width: "80vw" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width="33%">Original URL</TableCell>
              <TableCell width="32%">Created At</TableCell>
              <TableCell width="33%">Shortened URL</TableCell>
              <TableCell width="1%"></TableCell>
              <TableCell width="1%"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell width="33%">
                    <Link href={row.original} underline="hover">
                      {row.original}
                    </Link>
                  </TableCell>
                  <TableCell width="32%">
                    {new Date(row.createdAt).toUTCString().slice(5, 16)}
                  </TableCell>
                  <TableCell width="33%">
                    <Link
                      component="button"
                      variant="body2"
                      underline="hover"
                      onClick={() => {
                        handleRedirect(row.shortened);
                      }}
                    >
                      {process.env.REACT_APP_BACKEND_URL + "r/" + row.shortened}
                    </Link>
                  </TableCell>
                  <TableCell
                    width="1%"
                    sx={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
                    <IconButton
                      color="secondary"
                      onClick={() => handleClickQR(row)}
                    >
                      <QrCodeIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    width="1%"
                    sx={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
                    <IconButton
                      color="secondary"
                      onClick={() => handleClickDelete(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleCloseConfirmationDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            onClick={handleCloseConfirmationDialog}
            color="error"
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handleDelete}
            loading={isLoading}
            color="primary"
            autoFocus
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <QRCodeDialog
        open={QRDialogOpen}
        close={handleCloseQRDialog}
        originalURL={selectedRow ? selectedRow.original : ""}
      />
    </div>
  );
};

export default URLTable;
