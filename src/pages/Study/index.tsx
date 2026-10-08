import { useStudy } from "./useStudy";
import { StudySession } from "../../components/StudySession";

export const Study = () => {
  const { cards, loading, handleRate, handleExit, difficulty, tagId } = useStudy();

  return (
    <StudySession
      cards={cards}
      showRatings
      loading={loading}
      emptyMessage={
        difficulty || tagId
          ? "No hay tarjetas pendientes con ese filtro. Vuelve más tarde o prueba con otro."
          : undefined
      }
      onRate={handleRate}
      onExit={handleExit}
    />
  );
};
