import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { Nav, NavActions, NavButton, Separator } from "./styles";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <Nav>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <Logo height={36} />
        </div>
        <NavActions>
          <NavButton title="Perfil">
            <User size={20} />
          </NavButton>
          <NavButton title="Cerrar sesión" onClick={handleLogout}>
            <LogOut size={20} />
          </NavButton>
        </NavActions>
      </Nav>
      <Separator />
    </>
  );
};
