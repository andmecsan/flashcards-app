import { Breadcrumb } from "../Breadcrumb";
import { Navbar } from "../Navbar";
import { PageWrapper, Content } from "./styles";
import type { LayoutProps } from "./types";

export const Layout = ({ children, breadcrumb }: LayoutProps) => {
  return (
    <PageWrapper>
      <Navbar />
      <Content>
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {children}
      </Content>
    </PageWrapper>
  );
};
