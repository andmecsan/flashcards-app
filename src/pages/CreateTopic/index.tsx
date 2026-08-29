import { Plus, Trash2 } from "lucide-react";
import { Layout } from "../../components/Layout";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useCreateTopic } from "./useCreateTopic";
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
} from "./styles";

export const CreateTopic = () => {
  const {
    deck,
    form,
    fields,
    isEditing,
    handleSubmit,
    handleAddCard,
    handleRemoveCard,
    handleBack,
  } = useCreateTopic();

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", onClick: () => (window.location.href = "/") },
          { label: deck?.name || "", onClick: handleBack },
          { label: isEditing ? "Editar tema" : "Nuevo tema" },
        ]}
      />

      <FormWrapper>
        <Input
          label="Nombre del tema"
          placeholder="Ej: Verbos irregulares"
          registration={form.register("name", {
            required: "El nombre es obligatorio",
          })}
          error={form.formState.errors.name?.message}
        />

        <Divider />

        <SectionTitle>Tarjetas</SectionTitle>

        {fields.map((field, index) => (
          <CardRow key={field.id}>
            <CardNumber>{index + 1}</CardNumber>
            <CardInputs>
              <Input
                label="Pregunta"
                placeholder="Anverso de la tarjeta"
                registration={form.register(`cards.${index}.front`, {
                  required: "Obligatorio",
                })}
                error={form.formState.errors.cards?.[index]?.front?.message}
              />
              <Input
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
          <Button onClick={handleSubmit}>
            {isEditing ? "Guardar cambios" : "Guardar tema"}
          </Button>
        </Actions>
      </FormWrapper>
    </Layout>
  );
};
