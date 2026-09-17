import { ChevronLeft, ChevronRight } from "lucide-react";
import { Wrapper, PageButton } from "./styles";
import type { PaginationProps } from "./types";

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Wrapper>
      <PageButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft size={16} />
      </PageButton>
      {pages.map((p) => (
        <PageButton
          key={p}
          $active={p === page}
          onClick={() => onPageChange(p)}
        >
          {p}
        </PageButton>
      ))}
      <PageButton
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={16} />
      </PageButton>
    </Wrapper>
  );
};
