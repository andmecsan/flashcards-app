import { Breadcrumb } from "../Breadcrumb";
import { Loader } from "../Loader";
import { Navbar } from "../Navbar";
import { PageWrapper, Content } from "./styles";
import type { LayoutProps } from "./types";

export const Layout = ({
  children,
  breadcrumb,
  loading,
  loadingMessage,
}: LayoutProps) => {
  return (
    <PageWrapper>
      <Navbar />
      <Content>
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {loading ? <Loader message={loadingMessage} /> : children}
      </Content>
    </PageWrapper>
  );
};
