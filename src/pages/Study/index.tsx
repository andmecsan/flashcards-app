import { RotateCcw, LogOut } from "lucide-react";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { useStudy } from "./useStudy";
import {
  Wrapper,
  StudyCard,
  CardHeader,
  Progress,
  FlipButton,
  CardBody,
  CardLabel,
  CardText,
  CardFooter,
  RatingButtons,
  CompletedWrapper,
  CompletedTitle,
  CompletedMessage,
} from "./styles";

export const Study = () => {
  const {
    currentCard,
    isFlipped,
    completed,
    loading,
    progress,
    total,
    handleFlip,
    handleRate,
    handleExit,
  } = useStudy();

  if (loading)
    return (
      <Wrapper>
        <Loader message="Cargando tarjetas..." />
      </Wrapper>
    );

  if (!currentCard && !completed) {
    return (
      <Wrapper>
        <CompletedWrapper>
          <CompletedTitle>No hay tarjetas pendientes</CompletedTitle>
          <CompletedMessage>Vuelve más tarde para repasar.</CompletedMessage>
          <Button onClick={handleExit}>Volver al mazo</Button>
        </CompletedWrapper>
      </Wrapper>
    );
  }

  if (completed) {
    return (
      <Wrapper>
        <StudyCard>
          <CompletedWrapper>
            <CompletedTitle>¡Sesión completada!</CompletedTitle>
            <CompletedMessage>Has repasado {total} tarjetas.</CompletedMessage>
            <Button onClick={handleExit}>Volver al mazo</Button>
          </CompletedWrapper>
        </StudyCard>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <StudyCard>
        <CardHeader>
          <Progress>
            {progress}/{total}
          </Progress>
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
          <Button
            $variant="ghost"
            icon={<LogOut size={16} />}
            onClick={handleExit}
          >
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
            </RatingButtons>
          ) : (
            <CompletedMessage>
              Pulsa la tarjeta para ver la respuesta
            </CompletedMessage>
          )}
        </CardFooter>
      </StudyCard>
    </Wrapper>
  );
};
