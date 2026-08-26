import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "../src/styles/global";
import { Login } from "./pages/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Login />
    </ThemeProvider>
  );
}

export default App;
