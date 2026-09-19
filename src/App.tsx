import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import { theme } from "./styles/theme";
import { GlobalStyle } from "../src/styles/global";
import { Login } from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { AuthCallback } from "./pages/AuthCallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./context/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DeckDetail } from "./pages/DeckDetail";
import { CreateTopic } from "./pages/CreateTopic";
import { Study } from "./pages/Study";
import { Review } from "./pages/Review";
import { Profile } from "./pages/Profile";
import { FAQ } from "./pages/FAQ";
import { EditTopic } from "./pages/EditTopic";

function App() {
  const queryClient = new QueryClient();
  const { token, login } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "'Mulish', sans-serif",
              fontSize: "0.875rem",
              borderRadius: "0.625rem",
            },
            success: {
              style: { background: "#E1F5EE", color: "#0F6E56" },
            },
            error: {
              style: { background: "#FCEBEB", color: "#E24B4A" },
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth/callback"
              element={<AuthCallback onLogin={login} />}
            />
            <Route
              path="/login"
              element={
                token ? <Navigate to="/" /> : <Login onLogin={login} />
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/faq" element={<FAQ />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/decks/:id" element={<DeckDetail />} />
              <Route path="/decks/:deckId/new-topic" element={<CreateTopic />} />
              <Route path="/categories/:categoryId/edit" element={<EditTopic />} />
              <Route path="/study/:deckId" element={<Study key="study" />} />
              <Route path="/decks/:deckId/review/:categoryId" element={<Review />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
