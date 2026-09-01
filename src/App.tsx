import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "../src/styles/global";
import { Login } from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { AuthCallback } from "./pages/AuthCallback";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeckDetail } from "./pages/DeckDetail";
import { CreateTopic } from "./pages/CreateTopic";
import { Study } from "./pages/Study";
import { Review } from "./pages/Review";

function App() {
  const queryClient = new QueryClient();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth/callback"
              element={<AuthCallback onLogin={handleLogin} />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={token ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/decks/:id"
              element={token ? <DeckDetail /> : <Navigate to="/login" />}
            />
            <Route
              path="/decks/:deckId/new-topic"
              element={token ? <CreateTopic /> : <Navigate to="/login" />}
            />
            <Route
              path="/categories/:categoryId/edit"
              element={token ? <CreateTopic /> : <Navigate to="/login" />}
            />
            <Route
              path="/study/:deckId"
              element={token ? <Study key="study" /> : <Navigate to="/login" />}
            />
            <Route
            path="/decks/:deckId/review/:categoryId" element=
            {token ? <Review /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
