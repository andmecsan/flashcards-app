import { useState } from "react";
import { LogOut, SkipForward } from "lucide-react";
import { Button } from "../Button";
import { Loader } from "../Loader";
import type { StudySessionProps } from "./types";
import {
  Wrapper,
  CardContainer,
  CardInner,
  CardFace,
  CardFaceBack,
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
import { CardHeader } from "./Header";

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
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 600);
    } else {
      setIsFlipped(false);
      setTimeout(() => {
        setCompleted(true);
      }, 600);
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
        <CardContainer>
          <CardFace style={{ position: "relative" }}>
            <EmptyWrapper>
              <EmptyTitle>{completedTitle}</EmptyTitle>
              <EmptyMessage>
                {completedMessage || `Has repasado ${total} tarjetas.`}
              </EmptyMessage>
              <Button onClick={onExit}>Volver</Button>
            </EmptyWrapper>
          </CardFace>
        </CardContainer>
      </Wrapper>
    );
  }

  if (!currentCard) return null;

  return (
    <Wrapper>
      <CardContainer>
        <CardInner $flipped={isFlipped}>
          <CardFace>
            <CardHeader
              onFlip={handleFlip}
              progress={progress}
              total={total}
              onFlipLabel="Ver respuesta"
              categoryName={currentCard.category}
            />
            <CardBody onClick={handleFlip}>
              <CardLabel>Pregunta:</CardLabel>
              <CardText>{currentCard.front}</CardText>
            </CardBody>
            <CardFooter>
              <Button
                $variant="danger"
                icon={<LogOut size={16} />}
                onClick={onExit}
              >
                Salir
              </Button>
              <HintText>Pulsa la tarjeta para ver la respuesta</HintText>
            </CardFooter>
          </CardFace>

          <CardFaceBack>
            <CardHeader
              onFlip={handleFlip}
              onFlipLabel="Ver pregunta"
              progress={progress}
              total={total}
              categoryName={currentCard.category}
            />

            <CardBody onClick={handleFlip}>
              <CardLabel>Respuesta:</CardLabel>
              <CardText>{currentCard.back}</CardText>
            </CardBody>
            <CardFooter>
              <Button
                $variant="ghost"
                icon={<LogOut size={16} />}
                onClick={onExit}
              >
                Salir
              </Button>
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
                    $variant="danger"
                    icon={<SkipForward size={16} />}
                    onClick={handleNext}
                  >
                    Saltar
                  </Button>
                )}
              </RatingButtons>
            </CardFooter>
          </CardFaceBack>
        </CardInner>
      </CardContainer>
    </Wrapper>
  );
};
