import { useRef } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Layout } from "../Layout";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { Loader } from "../Loader";
import type { TopicFormProps } from "./types";
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
  SectionHeader,
} from "./styles";

export const TopicForm = ({
  mode,
  deckName,
  form,
  fields,
  serverError,
  handleSubmit,
  handleAddCard,
  handleRemoveCard,
  handleBack,
  generating,
  handleGenerateFromPdf,
}: TopicFormProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      handleGenerateFromPdf?.(file);
    }
    e.target.value = "";
  };

  const breadcrumb = [
    { label: "Home", onClick: () => (window.location.href = "/") },
    { label: deckName || "", onClick: handleBack },
    { label: mode === "create" ? "Nuevo tema" : "Editar tema" },
  ];

  if (generating) {
    return (
      <Layout breadcrumb={breadcrumb}>
        <FormWrapper>
          <Loader message="La IA está generando las tarjetas..." />
        </FormWrapper>
      </Layout>
    );
  }

  return (
    <Layout breadcrumb={breadcrumb}>
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

        <SectionHeader>
          <SectionTitle>Tarjetas</SectionTitle>
          {mode === "create" && (
            <>
              <Button
                $variant="primary"
                $size="sm"
                icon={<Sparkles size={16} />}
                onClick={() => fileRef.current?.click()}
              >
                Crear con IA
              </Button>
              <HiddenInput
                ref={fileRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </>
          )}
        </SectionHeader>

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
            {mode === "create" ? "Guardar tema" : "Guardar cambios"}
          </Button>
        </Actions>
      </FormWrapper>
    </Layout>
  );
};
