import { TopicForm } from "../../components/TopicForm";
import { useEditTopic } from "./useEditTopic";

export const EditTopic = () => {
  const {
    deck,
    form,
    fields,
    serverError,
    handleSubmit,
    handleAddCard,
    handleRemoveCard,
    handleBack,
  } = useEditTopic();

  return (
    <TopicForm
      mode="edit"
      deckName={deck?.name}
      form={form}
      fields={fields}
      serverError={serverError}
      handleSubmit={handleSubmit}
      handleAddCard={handleAddCard}
      handleRemoveCard={handleRemoveCard}
      handleBack={handleBack}
    />
  );
};
