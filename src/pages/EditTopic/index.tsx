import { Plus, Trash2 } from "lucide-react";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { useEditTopic } from "./useEditTopic";
import {
  FormWrapper,
  CardRow,
  CardInputs,
  CardNumber,
  RemoveButton,
  Divider,
  SectionTitle,
  Actions,
  ErrorMessage,
} from "../CreateTopic/styles";

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
    <Layout
      breadcrumb={[
        { label: "Home", onClick: () => (window.location.href = "/") },
        { label: deck?.name || "", onClick: handleBack },
        { label: "Editar tema" },
      ]}
    >
      <FormWrapper>
        <Input
          label="Nombre del tema"
          placeholder="Ej: Verbos irregulares"
          registration={form.register("name", {
            required: "El nombre es obligatorio",
          })}
          error={form.formState.errors.name?.message || serverError}
        />

        <Divider />

        <SectionTitle>Tarjetas</SectionTitle>

        {fields.map((field, index) => (
          <CardRow key={field.id}>
            <CardNumber>{index + 1}</CardNumber>
            <CardInputs>
              <TextArea
                label="Pregunta"
                placeholder="Anverso de la tarjeta"
                registration={form.register(`cards.${index}.front`, {
                  required: "Obligatorio",
                })}
                error={form.formState.errors.cards?.[index]?.front?.message}
              />
              <TextArea
                label="Respuesta"
                placeholder="Reverso de la tarjeta"
                registration={form.register(`cards.${index}.back`, {
                  required: "Obligatorio",
                })}
                error={form.formState.errors.cards?.[index]?.back?.message}
              />
            </CardInputs>
            <RemoveButton onClick={() => handleRemoveCard(index)}>
              <Trash2 size={16} />
            </RemoveButton>
          </CardRow>
        ))}

        {form.formState.errors.cards?.message && (
          <ErrorMessage>{form.formState.errors.cards.message}</ErrorMessage>
        )}

        <Button
          $variant="ghost"
          $fullWidth
          icon={<Plus size={18} />}
          onClick={handleAddCard}
        >
          Añadir tarjeta
        </Button>

        <Divider />

        <Actions>
          <Button $variant="ghost" onClick={handleBack}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar cambios</Button>
        </Actions>
      </FormWrapper>
    </Layout>
  );
};
