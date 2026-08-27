import { Navbar } from "../Navbar";
import { PageWrapper, Content } from "./styles";
import type { LayoutProps } from "./types";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <PageWrapper>
      <Navbar />
      <Content>{children}</Content>
    </PageWrapper>
  );
};
