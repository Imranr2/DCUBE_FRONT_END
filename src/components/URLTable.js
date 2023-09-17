import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
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

const URLTable = ({ data, change }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleClickDelete = (row) => {
    setSelectedRow(row);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseConfirmationDialog = () => {
    // Close the confirmation dialog without performing the delete action
    setDeleteConfirmationOpen(false);
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
                    <a href={row.original}>{row.original}</a>
                  </TableCell>
                  <TableCell width="32%">
                    {new Date(row.createdAt).toUTCString().slice(5, 16)}
                  </TableCell>
                  <TableCell width="33%">
                    <a href={row.shortened}>{"dcu.be/" + row.shortened}</a>
                  </TableCell>
                  <TableCell
                    width="1%"
                    sx={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
                    <IconButton color="secondary">
                      <QrCodeIcon />
                    </IconButton>{" "}
                  </TableCell>{" "}
                  <TableCell
                    width="1%"
                    sx={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
                    <IconButton
                      color="secondary"
                      onClick={() => handleClickDelete(row)}
                    >
                      <DeleteIcon />
                    </IconButton>{" "}
                  </TableCell>{" "}
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
    </div>
  );
};

export default URLTable;
