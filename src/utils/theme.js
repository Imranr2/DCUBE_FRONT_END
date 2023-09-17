import { createTheme } from "@mui/material/styles";

const breakpoints = {
  values: {
    xs: 0,
    sm: 0, // Phone
    md: 768, // Tablet/Laptop
    lg: 1500, // Desktop
    xl: 2000,
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#3772ff",
      light: "#FFF",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#083d77",
      contrastText: "#FFF",
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
      [`@media (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "40px",
      },
      fontWeight: 700,
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
      fontSize: "8px",
      fontWeight: 700,
    },
    body1: {
      fontSize: "20px",
      [`@media (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "14px",
      },
      fontWeight: 500,
    },
    body2: {
      fontSize: "20px",
      [`@media (max-width: ${breakpoints.values.md}px)`]: {
        fontSize: "14px",
      },
      fontWeight: 500,
    },
  },
});
