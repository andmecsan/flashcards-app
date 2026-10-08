import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Merge, Search } from "lucide-react";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { ConfirmModal } from "../../components/ConfirmModal";
import { MergeTagModal } from "../../components/MergeTagModal";
import { cardsLabel } from "../../utils/plural";
import { useMyTags } from "./useMyTags";
import {
  Content,
  Intro,
  List,
  Row,
  TagName,
  Count,
  RowActions,
  EditForm,
  EmptyState,
} from "./styles";

export const MyTags = () => {
  const navigate = useNavigate();
  const {
    tags, total, loading, search, setSearch, editing, startEditing, cancelEditing,
    renameError, rename, renaming, deleting, askDelete, confirmDelete,
    merging, askMerge, refresh, allTags,
  } = useMyTags();
  const [draft, setDraft] = useState("");

  const beginEdit = (tag: (typeof tags)[number]) => {
    setDraft(tag.name);
    startEditing(tag);
  };

  return (
    <Layout
      loading={loading}
      breadcrumb={[
        { label: "Home", onClick: () => navigate("/") },
        { label: "Perfil", onClick: () => navigate("/profile") },
        { label: "Mis etiquetas" },
      ]}
    >
      <Content>
        <Intro>
          Las etiquetas son tuyas: solo tú las ves y las usas para filtrar tus tarjetas. Aquí puedes
          renombrarlas, fusionar las que significan lo mismo («Mates» y «Matemáticas») o eliminarlas.
          Eliminar una etiqueta no borra las tarjetas.
        </Intro>

        {total > 5 && (
          <Input
            placeholder="Buscar etiquetas..."
            value={search}
            onChange={setSearch}
            icon={<Search size={18} />}
          />
        )}

        {tags.length === 0 ? (
          <EmptyState>
            {total === 0
              ? "Aún no tienes etiquetas. Añádelas al crear o editar un temario."
              : "Ninguna etiqueta coincide con la búsqueda."}
          </EmptyState>
        ) : (
          <List>
            {tags.map((tag) => (
              <Row key={tag.id}>
                {editing?.id === tag.id ? (
                  <EditForm
                    onSubmit={(e) => {
                      e.preventDefault();
                      rename(tag, draft);
                    }}
                  >
                    <Input
                      value={draft}
                      onChange={setDraft}
                      error={renameError || undefined}
                      placeholder="Nombre de la etiqueta"
                    />
                    <Button type="submit" $size="sm" disabled={renaming || !draft.trim()}>
                      Guardar
                    </Button>
                    <Button $variant="ghost" $size="sm" onClick={cancelEditing}>
                      Cancelar
                    </Button>
                  </EditForm>
                ) : (
                  <>
                    <TagName>{tag.name}</TagName>
                    <Count>{cardsLabel(tag.cards_count ?? 0)}</Count>
                    <RowActions>
                      <Button
                        $variant="ghost"
                        $size="sm"
                        $iconOnly
                        icon={<Pencil size={14} />}
                        aria-label={`Renombrar ${tag.name}`}
                        title="Renombrar"
                        onClick={() => beginEdit(tag)}
                      />
                      <Button
                        $variant="ghost"
                        $size="sm"
                        $iconOnly
                        icon={<Merge size={14} />}
                        aria-label={`Fusionar ${tag.name} en otra`}
                        title="Fusionar en otra etiqueta"
                        disabled={allTags.length < 2}
                        onClick={() => askMerge(tag)}
                      />
                      <Button
                        $variant="ghost"
                        $size="sm"
                        $iconOnly
                        icon={<Trash2 size={14} />}
                        aria-label={`Eliminar ${tag.name}`}
                        title="Eliminar"
                        onClick={() => askDelete(tag)}
                      />
                    </RowActions>
                  </>
                )}
              </Row>
            ))}
          </List>
        )}
      </Content>

      {deleting && (
        <ConfirmModal
          title="Eliminar etiqueta"
          message={`¿Eliminar «${deleting.name}»? Se quitará de ${cardsLabel(deleting.cards_count ?? 0)}; las tarjetas no se borran.`}
          confirmLabel="Eliminar etiqueta"
          onConfirm={confirmDelete}
          onClose={() => askDelete(null)}
        />
      )}

      {merging && (
        <MergeTagModal
          tag={merging}
          options={allTags.filter((tag) => tag.id !== merging.id)}
          onMerged={() => {
            refresh();
            askMerge(null);
          }}
          onClose={() => askMerge(null)}
        />
      )}
    </Layout>
  );
};
