import { StudySession } from "../../components/StudySession";
import { useReview } from "./useReview";

export const Review = () => {
  const { cards, loading, handleRate, handleExit } = useReview();

  return (
    <StudySession
      cards={cards}
      loading={loading}
      showSkip
      emptyTitle="No hay tarjetas"
      emptyMessage="Esta categoría no tiene tarjetas todavía."
      completedTitle="¡Repaso completado!"
      onRate={handleRate}
      onExit={handleExit}
    />
  );
};
