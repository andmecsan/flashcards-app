import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { StatsBar } from "../../components/StatsBar";
import { CardSkeleton } from "../../components/Skeleton";
import { ConfirmModal } from "../../components/ConfirmModal";
import { CreateDeckModal } from "../CreateDeckModal";
import { useDashboard } from "./useDashboard";
import { Toolbar, SearchWrapper, Title, Grid, EmptyState } from "./styles";
import { ProgressBar } from "../../components/ProgressBar";
import { Pagination } from "../../components/Pagination";

export const Dashboard = () => {
  const {
    decks,
    stats,
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
              subtitle={`${deck.card_count} tarjetas`}
              badge={
                deck.due_count > 0 ? `${deck.due_count} pendientes` : undefined
              }
              icon={<span>{deck.icon}</span>}
              headerColor={deck.color}
              onClick={() => navigate(`/decks/${deck.id}`)}
              onDelete={() => handleDelete(deck.id)}
              onEdit={() => setEditDeck(deck)}
            >
              <ProgressBar
                mastered={deck.mastered}
                inProgress={deck.in_progress}
                newCards={deck.new_cards}
              />
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <p>
            {search
              ? "No hay asignaturas que coincidan"
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
