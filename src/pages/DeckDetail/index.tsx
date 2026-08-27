import { Search, Plus } from "lucide-react";
import { Layout } from "../../components/Layout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { CategoryCard } from "../../components/CategoryCard";
import { Loader } from "../../components/Loader";
import { useDeckDetail } from "./useDeckDetail";
import { Toolbar, SearchWrapper, Grid, EmptyState } from "./styles";
import { Breadcrumb } from "../../components/Breadcrumb";

export const DeckDetail = () => {
  const {
    deck,
    categories,
    search,
    setSearch,
    loading,
    setShowModal,
    handleDelete,
    handleCategoryClick,
    handleBack,
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

      <Toolbar>
        <SearchWrapper>
          <Input
            placeholder="Buscar categorías..."
            value={search}
            onChange={setSearch}
            icon={<Search size={18} />}
          />
        </SearchWrapper>
        <Button icon={<Plus size={18} />} onClick={() => setShowModal(true)}>
          Añadir categoría
        </Button>
      </Toolbar>

      {categories.length > 0 ? (
        <Grid>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              cardCount={category.card_count}
              onClick={() => handleCategoryClick(category.id)}
              onDelete={() => handleDelete(category.id)}
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
    </Layout>
  );
};
