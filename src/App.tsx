import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
// import { theme } from "./theme/theme";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fbc02d",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
