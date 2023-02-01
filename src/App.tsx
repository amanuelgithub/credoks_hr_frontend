import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
// import DisplayPdf from "./components/DisplayPdf";
import Router from "./Router";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <DisplayPdf /> */}
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
