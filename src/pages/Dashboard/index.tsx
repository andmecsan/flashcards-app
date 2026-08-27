import { Search, Plus } from "lucide-react";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Toolbar, SearchWrapper, Title, Grid, EmptyState } from "./styles";
import { useDashboard } from "./useDashboard";
import { Loader } from "../../components/Loader";
import { CreateDeckModal } from "../CreateDeckModal";

export const Dashboard = () => {
  const {
    decks,
    search,
    setSearch,
    loading,
    handleDelete,
    showModal,
    setShowModal,
  } = useDashboard();

  if (loading)
    return (
      <Layout>
        <Loader />
      </Layout>
    );

  return (
    <Layout>
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
        <Button $variant="primary" onClick={() => setShowModal(!showModal)}>
          <Plus size={18} /> Añadir mazo
        </Button>
      </Toolbar>

      {decks.length > 0 ? (
        <Grid>
          {decks.map((deck) => (
            <Card
              key={deck.id}
              id={deck.id}
              name={deck.name}
              cardCount={deck.card_count}
              dueCount={deck.due_count}
              onClick={() => console.log("entra en el mazo")}
              onDelete={() => handleDelete(deck.id)}
            />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <p>No hay mazos que coincidan con tu búsqueda</p>
        </EmptyState>
      )}
      {showModal && <CreateDeckModal onClose={() => setShowModal(false)} />}
    </Layout>
  );
};
