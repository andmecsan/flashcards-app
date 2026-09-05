import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import { Layout } from "../../components/Layout";
import { Button } from "../../components/Button";
import {
  Content,
  Tab,
  Section,
  SectionTitle,
  Paragraph,
  Highlight,
  RatingTable,
  RatingDesc,
  ModeCard,
  ModeTitle,
  ModeDesc,
  Sidebar,
  Panel,
} from "./styles";

const TABS = [
  { id: "what", label: "¿Por qué funciona?" },
  { id: "how", label: "¿Cuándo repaso cada tarjeta?" },
  { id: "ratings", label: "Calificaciones" },
  { id: "modes", label: "Estudiar vs Repasar" },
  { id: "stats", label: "¿Qué significan los estadísticas?" },
];

export const FAQ = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("what");

  return (
    <Layout
      breadcrumb={[
        { label: "Home", onClick: () => navigate("/") },
        { label: "¿Cómo funciona Flash Learn?" },
      ]}
    >
      <Content>
        <Sidebar>
          {TABS.map((tab) => (
            <Tab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Tab>
          ))}
        </Sidebar>
        <Panel>
          {activeTab === "what" && (
            <Section>
              <SectionTitle>Hablemos de la repetición espaciada</SectionTitle>
              <Paragraph>
                La repetición espaciada es una técnica de estudio que consiste
                en repasar la información justo antes de que la olvides. En
                lugar de estudiar todo de golpe, el sistema calcula el momento
                óptimo para cada tarjeta — así dedicas menos tiempo y recuerdas
                más.
              </Paragraph>
              <Paragraph>
                Flash Learn usa el algoritmo <Highlight>SM-2</Highlight>, creado
                por Piotr Wozniak en 1987. Es el mismo sistema que usan
                aplicaciones como Anki y SuperMemo, utilizado por millones de
                estudiantes en todo el mundo.
              </Paragraph>
            </Section>
          )}

          {activeTab === "how" && (
            <Section>
              <SectionTitle>
                ¿Cómo decide la app cuándo mostrarte cada tarjeta?
              </SectionTitle>
              <Paragraph>
                Cada vez que calificas una tarjeta, el sistema decide cuándo
                deberías volver a verla. La idea es simple: cuanto mejor la
                recuerdas, más tiempo pasa hasta el próximo repaso.
              </Paragraph>
              <Paragraph>
                Si aciertas una tarjeta por primera vez, la verás al día
                siguiente. Si la vuelves a acertar, la verás en 6 días. Si la
                aciertas de nuevo, en unas 2 semanas... y así sucesivamente.
                Cada acierto consecutivo alarga el tiempo de espera.
              </Paragraph>
              <Paragraph>
                Pero si fallas una tarjeta, el sistema entiende que aún no la
                dominas y te la vuelve a mostrar al día siguiente, como si
                empezaras de cero con ella.
              </Paragraph>
              <Paragraph>
                Además, el sistema se adapta a cada tarjeta. Si una te resulta
                fácil y siempre la aciertas con confianza, los intervalos crecen
                más rápido. Si otra te cuesta más, los intervalos crecen más
                despacio. Así dedicas más tiempo a lo que te cuesta y menos a lo
                que ya sabes.
              </Paragraph>
            </Section>
          )}

          {activeTab === "ratings" && (
            <Section>
              <SectionTitle>
                ¿Qué significan los botones de calificación?
              </SectionTitle>
              <Paragraph>
                Cuando estudias, después de ver la respuesta calificas tu
                recuerdo:
              </Paragraph>
              <RatingTable>
                <Button $variant="danger" $soft $size="sm" disabled>
                  No lo sabía
                </Button>
                <RatingDesc>
                  No recordabas la respuesta. La tarjeta se reinicia y la verás
                  mañana.
                </RatingDesc>
                <Button $variant="warning" $soft $size="sm" disabled>
                  Más o menos
                </Button>
                <RatingDesc>
                  Recordabas algo pero con dificultad. La tarjeta avanza pero
                  con un intervalo más corto.
                </RatingDesc>
                <Button $variant="success" $soft $size="sm" disabled>
                  Lo sabía
                </Button>
                <RatingDesc>
                  Recordabas bien la respuesta. La tarjeta avanza al siguiente
                  intervalo completo.
                </RatingDesc>
              </RatingTable>
            </Section>
          )}

          {activeTab === "modes" && (
            <Section>
              <SectionTitle>Estudiar vs Repasar</SectionTitle>
              <Paragraph>
                Flash Learn tiene dos modos de practicar con tus tarjetas:
              </Paragraph>

              <ModeCard
                $color={theme.colors.success}
                $bg={theme.colors.successLight}
              >
                <ModeTitle $color={theme.colors.success}>Estudiar</ModeTitle>
                <ModeDesc>
                  Solo muestra tarjetas que el algoritmo considera que debes
                  repasar hoy. Tus calificaciones afectan al sistema: recalcula
                  cuándo debes ver cada tarjeta otra vez. Es el modo principal
                  de estudio.
                </ModeDesc>
              </ModeCard>

              <ModeCard
                $color={theme.colors.primary}
                $bg={theme.colors.primaryLight}
              >
                <ModeTitle $color={theme.colors.primary}>Repasar</ModeTitle>
                <ModeDesc>
                  Muestra todas las tarjetas de una categoría, estén pendientes
                  o no. Tus calificaciones no afectan al algoritmo — es un modo
                  libre para refrescar antes de un examen o simplemente navegar
                  tus tarjetas sin alterar la planificación.
                </ModeDesc>
              </ModeCard>
            </Section>
          )}

          {activeTab === "stats" && (
            <Section>
              <SectionTitle>¿Qué significan las estadísticas?</SectionTitle>

              <Paragraph>
                <Highlight>Racha de estudio: </Highlight> días consecutivos que
                has estudiado. Se reinicia si dejas un día sin estudiar.
              </Paragraph>
              <Paragraph>
                <Highlight>Tasa de éxito: </Highlight> porcentaje de tarjetas
                que calificaste con "Lo sabía" sobre el total de calificaciones
                en modo Estudiar. "Más o menos" avanza la tarjeta pero no cuenta
                como éxito — si dudaste, aún hay margen de mejora.
              </Paragraph>
              <Paragraph>
                <Highlight>Tarjeta dominada: </Highlight> una tarjeta cuyo
                intervalo de repaso supera los 21 días. Significa que la has
                acertado tantas veces consecutivas que el sistema confía en que
                no la olvidarás en al menos 3 semanas.
              </Paragraph>
              <Paragraph>
                <Highlight>Barra de progreso: </Highlight> muestra tres niveles
                para cada mazo: tarjetas dominadas (morado), en progreso
                (amarillo) y nuevas (gris). Así ves de un vistazo dónde vas bien
                y dónde necesitas más práctica.
              </Paragraph>
            </Section>
          )}
        </Panel>
      </Content>
    </Layout>
  );
};
