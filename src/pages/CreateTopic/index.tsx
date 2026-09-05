import { useRef } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Layout } from "../../components/Layout";
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
  HiddenInput,
} from "./styles";
import { TextArea } from "../../components/TextArea";

export const CreateTopic = () => {
  const {
    deck,
    form,
    fields,
    isEditing,
    generating,
    handleSubmit,
    handleAddCard,
    handleRemoveCard,
    handleGenerateFromPdf,
    handleBack,
  } = useCreateTopic();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      handleGenerateFromPdf(file);
    }
    e.target.value = "";
  };

  return (
    <Layout
      loading={generating}
      loadingMessage="La IA está generando las tarjetas..."
      breadcrumb={[
        { label: "Home", onClick: () => (window.location.href = "/") },
        { label: deck?.name || "", onClick: handleBack },
        { label: isEditing ? "Editar tema" : "Nuevo tema" },
      ]}
    >
      <FormWrapper>
        <Button
          $variant="primary"
          $size="md"
          icon={<Sparkles size={16} />}
          onClick={() => fileRef.current?.click()}
        >
          Crear con IA
        </Button>
        <Input
          label="Nombre del tema"
          placeholder="Ej: Verbos irregulares"
          registration={form.register("name", {
            required: "El nombre es obligatorio",
          })}
          error={form.formState.errors.name?.message}
        />

        <Divider />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SectionTitle>Tarjetas</SectionTitle>

          <HiddenInput
            ref={fileRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>

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
          <Button onClick={handleSubmit}>
            {isEditing ? "Guardar cambios" : "Guardar tema"}
          </Button>
        </Actions>
      </FormWrapper>
    </Layout>
  );
};
