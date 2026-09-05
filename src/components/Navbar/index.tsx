import { User, LogOut, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Nav, NavActions, NavItem, Separator } from "./styles";

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
          <NavItem data-tooltip="¿Cómo funciona Flash Learn?">
            <Button
              $variant="ghost"
              $iconOnly
              icon={<HelpCircle size={20} />}
              onClick={() => navigate("/faq")}
            />
          </NavItem>
          <NavItem data-tooltip="Perfil">
            <Button
              $variant="ghost"
              $iconOnly
              icon={<User size={20} />}
              onClick={() => navigate("/profile")}
            />
          </NavItem>
          <NavItem data-tooltip="Cerrar sesión">
            <Button
              $variant="ghost"
              $iconOnly
              icon={<LogOut size={20} />}
              onClick={handleLogout}
            />
          </NavItem>
        </NavActions>
      </Nav>
      <Separator />
    </>
  );
};
