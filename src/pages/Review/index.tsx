import { StudySession } from "../../components/StudySession";
import { useReview } from "./useReview";

export const Review = () => {
  const { cards, loading, handleRate, handleExit, tagId } = useReview();

  return (
    <StudySession
      cards={cards}
      loading={loading}
      emptyTitle="No hay tarjetas"
      emptyMessage={
        tagId
          ? "Este temario no tiene tarjetas con esa etiqueta."
          : "Este temario no tiene tarjetas todavía."
      }
      completedTitle="¡Repaso completado!"
      showRatings={false}
      onRate={handleRate}
      onExit={handleExit}
    />
  );
};
