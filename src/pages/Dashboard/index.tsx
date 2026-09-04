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
    deleteId,
    setDeleteId,
    handleDelete,
    confirmDelete,
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
        <Title>Mis mazos</Title>
        <SearchWrapper>
          <Input
            placeholder="Buscar mazos..."
            value={search}
            onChange={setSearch}
            icon={<Search size={18} />}
          />
        </SearchWrapper>
        <Button icon={<Plus size={18} />} onClick={() => setShowModal(true)}>
          Añadir mazo
        </Button>
      </Toolbar>

      {loading ? (
        <Grid>
          <CardSkeleton count={3} />
        </Grid>
      ) : fetching ? (
        <Grid>
          <CardSkeleton count={decks.length || 3} />
        </Grid>
      ) : decks.length > 0 ? (
        <Grid>
          {decks.map((deck) => (
            <Card
              key={deck.id}
              title={deck.name}
              subtitle={`${deck.card_count} tarjetas`}
              badge={
                deck.due_count > 0 ? `${deck.due_count} pendientes` : undefined
              }
              onClick={() => navigate(`/decks/${deck.id}`)}
              onDelete={() => handleDelete(deck.id)}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <p>
            {search
              ? "No hay mazos que coincidan"
              : "Aún no tienes mazos. ¡Crea el primero!"}
          </p>
        </EmptyState>
      )}

      {showModal && <CreateDeckModal onClose={() => setShowModal(false)} />}

      {deleteId && (
        <ConfirmModal
          title="Eliminar mazo"
          message="¿Estás seguro? Se eliminarán todas las categorías y tarjetas de este mazo."
          onConfirm={confirmDelete}
          onClose={() => setDeleteId(null)}
        />
      )}
    </Layout>
  );
};
