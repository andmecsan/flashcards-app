import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useCreateDeck } from "./useCreateDeck";
import type { CreateDeckModalProps } from "./types";
import { Form } from "./styles";

export const CreateDeckModal = ({ onClose }: CreateDeckModalProps) => {
  const { form, handleSubmit } = useCreateDeck(onClose);

  return (
    <Modal title="Nuevo mazo" onClose={onClose}>
      <Form>
        <Input
          label="Nombre"
          placeholder="Ej: Chino HSK-1"
          registration={form.register("name", {
            required: "El nombre es obligatorio",
          })}
          error={form.formState.errors.name?.message}
        />
        <Input
          label="Descripción"
          placeholder="Ej: Vocabulario básico de chino mandarín"
          registration={form.register("description")}
        />
        <Button $fullWidth onClick={handleSubmit}>
          Crear mazo
        </Button>
      </Form>
    </Modal>
  );
};
