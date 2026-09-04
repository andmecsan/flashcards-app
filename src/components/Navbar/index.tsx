import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { Button } from "../Button";
import { Nav, NavActions, Separator } from "./styles";

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
          <Button $variant="ghost" $iconOnly icon={<User size={20} />} />
          <Button
            $variant="ghost"
            $iconOnly
            icon={<LogOut size={20} />}
            onClick={handleLogout}
          />
        </NavActions>
      </Nav>
      <Separator />
    </>
  );
};
