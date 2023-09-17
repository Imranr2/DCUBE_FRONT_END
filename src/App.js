import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { theme } from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AxiosInterceptor } from "./api/interceptor";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AxiosInterceptor>
          <Router>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </AxiosInterceptor>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
