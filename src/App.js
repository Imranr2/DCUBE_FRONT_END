import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { theme } from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AxiosInterceptor } from "./api/interceptor";
import { SnackbarProvider } from "notistack";
import { PublicRoutes, PrivateRoutes } from "./utils/Routes";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <AxiosInterceptor>
          <Router>
            <Routes>
              <Route element={<PublicRoutes />}>
                <Route path="/" element={<SignIn />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/home" element={<Home />}></Route>
              </Route>
            </Routes>
          </Router>
        </AxiosInterceptor>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
