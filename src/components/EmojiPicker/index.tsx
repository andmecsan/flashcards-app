import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Wrapper, Label, SelectedEmoji, PickerWrapper } from "./styles";
import type { EmojiPickerProps } from "./types";

export const EmojiPicker = ({ value, onChange }: EmojiPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Wrapper>
      <Label>Icono</Label>
      <SelectedEmoji onClick={() => setShowPicker(!showPicker)}>
        {value}
      </SelectedEmoji>
      {showPicker && (
        <PickerWrapper>
          <Picker
            data={data}
            onEmojiSelect={(emoji: { native: string }) => {
              onChange(emoji.native);
              setShowPicker(false);
            }}
            locale="es"
            theme="light"
            previewPosition="none"
            skinTonePosition="none"
          />
        </PickerWrapper>
      )}
    </Wrapper>
  );
};
