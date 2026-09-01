import { useStudy } from "./useStudy";
import { StudySession } from "../../components/StudySession";

export const Study = () => {
  const { cards, loading, handleRate, handleExit } = useStudy();

  return (
    <StudySession
      cards={cards}
      loading={loading}
      onRate={handleRate}
      onExit={handleExit}
    />
  );
};
