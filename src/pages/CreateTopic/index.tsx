import { TopicForm } from "../../components/TopicForm";
import { useCreateTopic } from "./useCreateTopic";

export const CreateTopic = () => {
  const {
    deck,
    form,
    fields,
    generating,
    serverError,
    handleSubmit,
    handleAddCard,
    handleRemoveCard,
    handleGenerateFromPdf,
    handleBack,
  } = useCreateTopic();

  return (
    <TopicForm
      mode="create"
      deckName={deck?.name}
      form={form}
      fields={fields}
      serverError={serverError}
      handleSubmit={handleSubmit}
      handleAddCard={handleAddCard}
      handleRemoveCard={handleRemoveCard}
      handleBack={handleBack}
      generating={generating}
      handleGenerateFromPdf={handleGenerateFromPdf}
    />
  );
};
