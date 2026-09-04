import { Search, Plus, Play, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Breadcrumb } from "../../components/Breadcrumb";
import { Loader } from "../../components/Loader";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useDeckDetail } from "./useDeckDetail";
import {
  Toolbar,
  SearchWrapper,
  Grid,
  EmptyState,
  ButtonGroup,
} from "./styles";
import { ImportPdfModal } from "../ImportPdfModal";
import { DeckStats } from "../../components/DeckStats";

export const DeckDetail = () => {
  const navigate = useNavigate();
  const {
    deck,
    stats,
    categories,
    search,
    setSearch,
    loading,
    deleteId,
    setDeleteId,
    handleDelete,
    confirmDelete,
    handleBack,
    showImport,
    setShowImport,
  } = useDeckDetail();

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
      <Breadcrumb
        items={[
          { label: "Home", onClick: handleBack },
          { label: deck?.name || "" },
        ]}
      />
      {stats && deck && <DeckStats stats={stats} deckId={deck.id} />}
      <Toolbar>
        <SearchWrapper>
          <Input
            placeholder="Buscar categorías..."
            value={search}
            onChange={setSearch}
            icon={<Search size={18} />}
          />
        </SearchWrapper>
        <ButtonGroup>
          <Button
            $variant="success"
            icon={<Play size={18} />}
            onClick={() => navigate(`/study/${deck?.id}`)}
          >
            Estudiar
          </Button>
          <Button
            icon={<Plus size={18} />}
            onClick={() => navigate(`/decks/${deck?.id}/new-topic`)}
          >
            Añadir categoría
          </Button>
          <Button
            $soft
            $variant="primary"
            icon={<Upload size={18} />}
            onClick={() => setShowImport(true)}
          >
            Importar PDF
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
              subtitle={`${category.card_count} tarjetas`}
              onClick={() =>
                navigate(`/decks/${deck?.id}/review/${category.id}`)
              }
              onDelete={() => handleDelete(category.id)}
              onEdit={() => navigate(`/categories/${category.id}/edit`)}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <p>
            {search
              ? "No hay categorías que coincidan"
              : "Aún no hay categorías. ¡Crea la primera!"}
          </p>
        </EmptyState>
      )}

      {deleteId && (
        <ConfirmModal
          title="Eliminar categoría"
          message="¿Estás seguro? Se eliminarán todas las tarjetas de esta categoría."
          onConfirm={confirmDelete}
          onClose={() => setDeleteId(null)}
        />
      )}
      {showImport && deck && (
        <ImportPdfModal deckId={deck.id} onClose={() => setShowImport(false)} />
      )}
    </Layout>
  );
};
