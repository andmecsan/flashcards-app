import {
  SkeletonBox,
  CardSkeletonWrapper,
  CardSkeletonHeader,
  CardSkeletonBody,
} from "./styles";
import type { CardSkeletonProps } from "./types";

export { SkeletonBox };

export const CardSkeleton = ({ count = 3 }: CardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeletonWrapper key={i}>
          <CardSkeletonHeader />
          <CardSkeletonBody>
            <SkeletonBox width="70%" height="1rem" />
            <SkeletonBox width="40%" height="0.75rem" />
          </CardSkeletonBody>
        </CardSkeletonWrapper>
      ))}
    </>
  );
};
