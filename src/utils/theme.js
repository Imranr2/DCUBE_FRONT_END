import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#61c7e8",
      contrastText: "#2c3332",
    },
    error: {
      main: "#FF4343",
    },
    warning: {
      main: "#FF9315",
    },
    info: {
      main: "#1E76DD",
    },
    success: {
      main: "#09b470",
    },
  },
  typography: {
    fontFamily: `"Lato", sans-serif`,
    h1: {
      fontSize: "60px",
      fontWeight: 500,
    },
    h2: {
      fontSize: "40px",
      fontWeight: 500,
    },
    h3: {
      fontSize: "30px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "24px",
      fontWeight: 700,
    },
    h5: {
      fontSize: "20px",
      fontWeight: 500,
    },
    h6: {
      fontSize: "12px",
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: "12px",
      fontWeight: 700,
    },
    body1: {
      fontSize: "10px",
      fontWeight: 500,
    },
    body2: {
      fontSize: "8px",
      fontWeight: 500,
    },
  },
});
