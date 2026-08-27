import { Wrapper, Link, Current, Separator } from "./styles";
import type { BreadcrumbProps } from "./types";

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <Wrapper>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            {index > 0 && <Separator>›</Separator>}
            {isLast ? (
              <Current>{item.label}</Current>
            ) : (
              <Link onClick={item.onClick}>{item.label}</Link>
            )}
          </span>
        );
      })}
    </Wrapper>
  );
};
