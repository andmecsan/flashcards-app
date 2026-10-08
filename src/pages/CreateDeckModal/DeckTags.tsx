import { Controller, type UseFormReturn } from "react-hook-form";
import { usePredefinedTags } from "../../hooks/useTags";
import { Select } from "../../components/Select";
import type { SelectOption } from "../../components/Select/types";
import type { PredefinedTag } from "../../utils/tags";
import { TagFields, Hint } from "./styles";
import type { DeckFormData } from "./types";

const EMPTY: SelectOption = { value: "", label: "Sin definir" };

const toOptions = (tags: PredefinedTag[], group?: string): SelectOption[] =>
  tags.map((tag) => ({ value: String(tag.id), label: tag.name, group }));

/** Área, nivel y curso de la asignatura: opcionales y del vocabulario controlado. */
export const DeckTags = ({ form }: { form: UseFormReturn<DeckFormData> }) => {
  const { data } = usePredefinedTags();
  if (!data) return null;

  const stages = data.levels.filter((level) => level.group !== "idiomas");
  const languages = data.levels.filter((level) => level.group === "idiomas");

  const fields = [
    { name: "areaId", label: "Área (opcional)", options: toOptions(data.areas) },
    {
      name: "levelId",
      label: "Nivel (opcional)",
      options: [...toOptions(stages, "Etapa"), ...toOptions(languages, "Idiomas (MCER)")],
    },
    { name: "courseId", label: "Curso (opcional)", options: toOptions(data.courses) },
  ] as const;

  return (
    <div>
      <TagFields>
        {fields.map(({ name, label, options }) => (
          <Controller
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <Select
                label={label}
                value={field.value ?? ""}
                onChange={field.onChange}
                options={[EMPTY, ...options]}
              />
            )}
          />
        ))}
      </TagFields>
      <Hint>Ayudan a organizar y, más adelante, a que otros encuentren tus temarios.</Hint>
    </div>
  );
};
