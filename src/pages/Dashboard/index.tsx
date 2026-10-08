import { Search, Plus, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { StatsBar } from "../../components/StatsBar";
import { MasteryClouds } from "../../components/MasteryClouds";
import { CardSkeleton } from "../../components/Skeleton";
import { ConfirmModal } from "../../components/ConfirmModal";
import { CreateDeckModal } from "../CreateDeckModal";
import { useDashboard } from "./useDashboard";
import { Toolbar, SearchWrapper, Title, Grid, EmptyState, Footer } from "./styles";
import { ProgressBar } from "../../components/ProgressBar";
import { Pagination } from "../../components/Pagination";
import { DeckChips } from "../../components/TagChip";

export const Dashboard = () => {
  const {
    decks,
    stats,
    mastery,
    masteryTags,
    search,
    setSearch,
    loading,
    fetching,
    showModal,
    setShowModal,
    editDeck,
    setEditDeck,
    deleteId,
    setDeleteId,
    handleDelete,
    confirmDelete,
    highlightedId,
    handleCreated,
    page,
    totalPages,
    handlePageChange,
    onlyFavorites,
    handleToggleOnlyFavorites,
    handleToggleFavorite,
  } = useDashboard();
  const navigate = useNavigate();

  return (
    <Layout>
      {stats && (
        <StatsBar
          stats={stats}
          onStudy={(deckId) => navigate(`/study/${deckId}`)}
        />
      )}

      {mastery && mastery.total_reviews > 0 && (
        <MasteryClouds
          data={mastery}
          tagData={masteryTags}
          onSelect={(entry, group) => {
            if (entry.deck_id === null) return;
            navigate(
              group === "tag"
                ? `/decks/${entry.deck_id}?tag_id=${entry.id}`
                : `/decks/${entry.deck_id}`,
            );
          }}
        />
      )}

      <Toolbar>
        <Title>Mis asignaturas</Title>
        <SearchWrapper>
          <Input
            placeholder="Buscar asignaturas..."
            value={search}
            onChange={setSearch}
            icon={<Search size={18} />}
          />
        </SearchWrapper>
        <Button
          $variant={onlyFavorites ? "primary" : "ghost"}
          icon={<Star size={18} fill={onlyFavorites ? "currentColor" : "none"} />}
          aria-pressed={onlyFavorites}
          onClick={handleToggleOnlyFavorites}
        >
          Favoritas
        </Button>
        <Button icon={<Plus size={18} />} onClick={() => setShowModal(true)}>
          Añadir asignatura
        </Button>
      </Toolbar>

      {loading || fetching ? (
        <Grid>
          <CardSkeleton count={decks.length || 3} />
        </Grid>
      ) : decks.length > 0 ? (
        <Grid>
          {decks.map((deck) => (
            <Card
              $highlighted={deck.id === highlightedId}
              key={deck.id}
              title={deck.name}
              icon={<span>{deck.icon}</span>}
              headerColor={deck.color}
              onClick={() => navigate(`/decks/${deck.id}`)}
              onDelete={() => handleDelete(deck.id)}
              onEdit={() => setEditDeck(deck)}
              isFavorite={deck.favorite}
              onToggleFavorite={() => handleToggleFavorite(deck)}
            >
              <Footer>
                <DeckChips tags={[deck.area, deck.level, deck.course]} pending={deck.due_count} />
                <ProgressBar
                  mastered={deck.mastered}
                  inProgress={deck.in_progress}
                  newCards={deck.new_cards}
                />
              </Footer>
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <p>
            {search
              ? "No hay asignaturas que coincidan"
              : onlyFavorites
                ? "Aún no tienes asignaturas favoritas. Pulsa la estrella de una asignatura para añadirla."
                : "Aún no tienes asignaturas. ¡Crea la primera!"}
          </p>
        </EmptyState>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {showModal && (
        <CreateDeckModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
      {editDeck && (
        <CreateDeckModal
          deck={editDeck}
          onClose={() => setEditDeck(null)}
          onCreated={handleCreated}
        />
      )}

      {deleteId && (
        <ConfirmModal
          title="Eliminar asignatura"
          message="¿Estás seguro? Se eliminarán todos los temarios y tarjetas de esta asignatura."
          onConfirm={confirmDelete}
          onClose={() => setDeleteId(null)}
        />
      )}
    </Layout>
  );
};
