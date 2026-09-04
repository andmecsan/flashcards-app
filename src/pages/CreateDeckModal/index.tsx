import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { ColorPicker } from "../../components/ColorPicker";
import { useCreateDeck } from "./useCreateDeck";
import type { CreateDeckModalProps } from "./types";
import { Form } from "./styles";
import { EmojiPicker } from "../../components/EmojiPicker";

export const CreateDeckModal = ({ onClose, deck }: CreateDeckModalProps) => {
  const { form, handleSubmit, isEditing } = useCreateDeck(onClose, deck);

  return (
    <Modal title={isEditing ? "Editar mazo" : "Nuevo mazo"} onClose={onClose}>
      <Form>
        <EmojiPicker
          value={form.watch("icon")}
          onChange={(emoji) => form.setValue("icon", emoji)}
        />
        <Input
          label="Nombre"
          placeholder="Ej: Chino HSK-1"
          registration={form.register("name", {
            required: "El nombre es obligatorio",
          })}
          error={form.formState.errors.name?.message}
        />
        <ColorPicker
          value={form.watch("color")}
          onChange={(color) => form.setValue("color", color)}
        />
        <Button $fullWidth onClick={handleSubmit}>
          {isEditing ? "Guardar cambios" : "Crear mazo"}
        </Button>
      </Form>
    </Modal>
  );
};
