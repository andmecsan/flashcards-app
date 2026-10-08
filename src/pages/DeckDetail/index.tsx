import { Search, Plus, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useDeckDetail } from "./useDeckDetail";
import {
  Toolbar,
  SearchWrapper,
  Grid,
  EmptyState,
  ButtonGroup,
} from "./styles";
import { DeckStats } from "../../components/DeckStats";
import { Pagination } from "../../components/Pagination";
import { DifficultySelect } from "../../components/DifficultySelect";
import { MoveCategoryModal } from "../../components/MoveCategoryModal";
import { DIFFICULTY_LABELS, studyFiltersQuery } from "../../utils/difficulty";
import { TagSelect } from "../../components/TagSelect";
import { cardsLabel } from "../../utils/plural";

export const DeckDetail = () => {
  const navigate = useNavigate();
  const {
    deck,
    stats,
    difficulty,
    setDifficulty,
    tagId,
    setTagId,
    categories,
    search,
    setSearch,
    loading,
    deleteId,
    setDeleteId,
    moveCategory,
    setMoveCategory,
    handleDelete,
    confirmDelete,
    handleBack,
    totalPages,
    page,
    handlePageChange,
  } = useDeckDetail();

  return (
    <Layout
      loading={loading}
      breadcrumb={[
        { label: "Home", onClick: handleBack },
        { label: deck?.name || "" },
      ]}
    >
      {stats && deck && <DeckStats stats={stats} deckId={deck.id} />}
      <Toolbar>
        <SearchWrapper>
          <Input
            placeholder="Buscar temarios..."
            value={search}
            onChange={setSearch}
            icon={<Search size={18} />}
          />
        </SearchWrapper>
        <ButtonGroup>
          {(stats?.tags?.length ?? 0) > 0 && (
            <TagSelect options={stats?.tags ?? []} value={tagId} onChange={setTagId} />
          )}
          <DifficultySelect
            ariaLabel="Ver y estudiar solo temarios de una dificultad"
            emptyLabel="Todas las dificultades"
            value={difficulty}
            counts={stats?.difficulty_counts}
            onChange={setDifficulty}
          />
          <Button
            $variant="success"
            icon={<Play size={18} />}
            onClick={() => navigate(`/study/${deck?.id}${studyFiltersQuery(difficulty, tagId)}`)}
          >
            Estudiar
          </Button>
          <Button
            icon={<Plus size={18} />}
            onClick={() => navigate(`/decks/${deck?.id}/new-topic`)}
          >
            Añadir temario
          </Button>
        </ButtonGroup>
      </Toolbar>

      {categories.length > 0 ? (
        <Grid>
          {categories.map((category) => (
            <Card
              key={category.id}
              $variant="stacked"
              title={category.name}
              subtitle={[
                cardsLabel(category.card_count),
                category.difficulty ? DIFFICULTY_LABELS[category.difficulty] : null,
              ]
                .filter(Boolean)
                .join(" · ")}
              onClick={() =>
                navigate(`/decks/${deck?.id}/review/${category.id}${studyFiltersQuery('', tagId)}`)
              }
              onDelete={() => handleDelete(category.id)}
              onEdit={() => navigate(`/categories/${category.id}/edit`)}
              onMove={() => setMoveCategory(category)}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <p>
            {search
              ? "No hay temarios que coincidan"
              : difficulty || tagId
                ? "Ningún temario cumple ese filtro. Marca la dificultad del temario o pon etiquetas a sus tarjetas al editarlo."
                : "Aún no hay temarios. ¡Crea el primero!"}
          </p>
        </EmptyState>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {moveCategory && deck && (
        <MoveCategoryModal
          category={moveCategory}
          currentDeckId={deck.id}
          onClose={() => setMoveCategory(null)}
        />
      )}
      {deleteId && (
        <ConfirmModal
          title="Eliminar temario"
          message="¿Estás seguro? Se eliminarán todas las tarjetas de este temario."
          onConfirm={confirmDelete}
          onClose={() => setDeleteId(null)}
        />
      )}
    </Layout>
  );
};
