import { BarChart3, Download, User } from "lucide-react";
import {
  Nav,
  LogoWrapper,
  LogoIcon,
  LogoText,
  NavActions,
  NavButton,
  Separator,
} from "./styles";

export const Navbar = () => {
  return (
    <>
      <Nav>
        <LogoWrapper>
          <LogoIcon>文</LogoIcon>
          <LogoText>Flash Learn</LogoText>
        </LogoWrapper>

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
