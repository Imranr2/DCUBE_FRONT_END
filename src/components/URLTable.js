import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableContainer,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import QrCodeIcon from "@mui/icons-material/QrCode";

const URLTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = [
    {
      originalUrl: "https://www.google.com/",
      createdAt: "2023-09-17 10:30 AM",
      shortenedUrl: "https://short.ly/abcdef",
    },
  ];

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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell width="33%">
                    <a href={row.originalUrl}>{row.originalUrl}</a>
                  </TableCell>
                  <TableCell width="32%">{row.createdAt}</TableCell>
                  <TableCell width="33%">
                    <a href={row.shortenedUrl}>{row.shortenedUrl}</a>
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
                    <IconButton color="secondary">
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default URLTable;
