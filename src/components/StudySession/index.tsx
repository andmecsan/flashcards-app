import { useState } from "react";
import { RotateCcw, LogOut, SkipForward } from "lucide-react";
import { Button } from "../Button";
import { Loader } from "../Loader";
import type { StudySessionProps } from "./types";
import {
  Wrapper,
  Card,
  CardHeader,
  Progress,
  CategoryLabel,
  FlipButton,
  CardBody,
  CardLabel,
  CardText,
  CardFooter,
  RatingButtons,
  HintText,
  EmptyWrapper,
  EmptyTitle,
  EmptyMessage,
} from "./styles";

export const StudySession = ({
  cards,
  loading,
  emptyTitle = "No hay tarjetas pendientes",
  emptyMessage = "Vuelve más tarde para repasar.",
  completedTitle = "¡Sesión completada!",
  completedMessage,
  showSkip = false,
  onRate,
  onExit,
}: StudySessionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const total = cards.length;
  const currentCard = completed ? null : cards[currentIndex];
  const progress = currentIndex + 1;

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRate = (quality: number) => {
    if (!currentCard) return;
    onRate(currentCard.id, quality);
    handleNext();
  };

  if (loading)
    return (
      <Wrapper>
        <Loader message="Cargando tarjetas..." />
      </Wrapper>
    );

  if (cards.length === 0) {
    return (
      <Wrapper>
        <EmptyWrapper>
          <EmptyTitle>{emptyTitle}</EmptyTitle>
          <EmptyMessage>{emptyMessage}</EmptyMessage>
          <Button onClick={onExit}>Volver</Button>
        </EmptyWrapper>
      </Wrapper>
    );
  }

  if (completed) {
    return (
      <Wrapper>
        <Card>
          <EmptyWrapper>
            <EmptyTitle>{completedTitle}</EmptyTitle>
            <EmptyMessage>
              {completedMessage || `Has repasado ${total} tarjetas.`}
            </EmptyMessage>
            <Button onClick={onExit}>Volver</Button>
          </EmptyWrapper>
        </Card>
      </Wrapper>
    );
  }

  if (!currentCard) return null;

  return (
    <Wrapper>
      <Card>
        <CardHeader>
          <Progress>
            {progress}/{total}
          </Progress>
          <CategoryLabel>{currentCard.category}</CategoryLabel>
          <FlipButton onClick={handleFlip}>
            Dar la vuelta <RotateCcw size={16} />
          </FlipButton>
        </CardHeader>

        <CardBody onClick={handleFlip}>
          <CardLabel>{isFlipped ? "Respuesta:" : "Pregunta:"}</CardLabel>
          <CardText>
            {isFlipped ? currentCard.back : currentCard.front}
          </CardText>
        </CardBody>

        <CardFooter>
          <Button $variant="ghost" icon={<LogOut size={16} />} onClick={onExit}>
            Salir
          </Button>

          {isFlipped ? (
            <RatingButtons>
              <Button $variant="danger" $soft onClick={() => handleRate(1)}>
                No lo sabía
              </Button>
              <Button $variant="warning" $soft onClick={() => handleRate(3)}>
                Más o menos
              </Button>
              <Button $variant="success" $soft onClick={() => handleRate(5)}>
                Lo sabía
              </Button>
              {showSkip && (
                <Button
                  $variant="ghost"
                  icon={<SkipForward size={16} />}
                  onClick={handleNext}
                >
                  Saltar
                </Button>
              )}
            </RatingButtons>
          ) : (
            <HintText>Pulsa la tarjeta para ver la respuesta</HintText>
          )}
        </CardFooter>
      </Card>
    </Wrapper>
  );
};
