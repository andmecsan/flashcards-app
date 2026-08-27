import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { AuthCallbackProps } from "./types";

export const AuthCallback = ({ onLogin }: AuthCallbackProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      onLogin(token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams, onLogin]);

  return <p>Autenticando...</p>;
};
