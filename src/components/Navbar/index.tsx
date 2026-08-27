import { BarChart3, Download, User } from "lucide-react";
import { Nav, NavActions, NavButton, Separator } from "./styles";
import { Logo } from "../Logo";

export const Navbar = () => {
  return (
    <>
      <Nav>
        <Logo height={36} />
        <NavActions>
          <NavButton title="Estadísticas">
            <BarChart3 size={20} />
          </NavButton>
          <NavButton title="Importar">
            <Download size={20} />
          </NavButton>
          <NavButton title="Perfil">
            <User size={20} />
          </NavButton>
        </NavActions>
      </Nav>
      <Separator />
    </>
  );
};
