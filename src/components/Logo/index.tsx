import logoSvg from "../../assets/logo.svg";
import type { LogoProps } from "./types";

export const Logo = ({ height = 40 }: LogoProps) => {
  return <img src={logoSvg} alt="Flash Learn" height={height} />;
};
