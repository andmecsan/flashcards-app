import { useState } from 'react'
import { WordCloud } from '../WordCloud'
import { Wrapper, Header, Tabs, Tab, GroupSwitch, GroupButton, Message, Hint } from './styles'
import { toCloudItems } from './utils'
import type { MasteryCloudsProps, MasteryGroup } from './types'

type View = 'weak' | 'strong'

const TABS: Record<View, string> = { weak: 'Para reforzar', strong: 'Puntos fuertes' }

const GROUPS: Record<MasteryGroup, { label: string; noun: string; open: string }> = {
  category: { label: 'Por temario', noun: 'temario', open: 'abrir su asignatura' },
  tag: { label: 'Por etiqueta', noun: 'etiqueta', open: 'ver sus tarjetas en su asignatura' },
}

const copyFor = (view: View, group: MasteryGroup) => {
  const { noun, open } = GROUPS[group]
  return view === 'weak'
    ? {
        empty:
          group === 'category'
            ? 'Ningún temario necesita refuerzo ahora mismo. ¡Buen trabajo!'
            : 'Ninguna etiqueta necesita refuerzo ahora mismo. ¡Buen trabajo!',
        hint: `Cuanto más grande, más te cuesta. Pulsa un${group === 'tag' ? 'a' : ''} ${noun} para ${open}.`,
      }
    : {
        empty: 'Aún no hay puntos fuertes. Sigue estudiando: se detectan con buen acierto y tarjetas dominadas.',
        hint: `Cuanto más grande, mejor lo dominas. Pulsa un${group === 'tag' ? 'a' : ''} ${noun} para ${open}.`,
      }
}

export const MasteryClouds = ({ data, tagData, onSelect }: MasteryCloudsProps) => {
  const [view, setView] = useState<View>('weak')
  const [group, setGroup] = useState<MasteryGroup>('category')

  const hasTags = (tagData?.total_reviews ?? 0) > 0
  const current = group === 'tag' && hasTags && tagData ? tagData : data
  const activeGroup: MasteryGroup = current === tagData ? 'tag' : 'category'

  const entries = view === 'weak' ? current.weak : current.strong
  const items = toCloudItems(entries, (e) => (view === 'weak' ? e.weakness : e.strength), activeGroup)
  const copy = copyFor(view, activeGroup)

  return (
    <Wrapper aria-label="Estado de tus temarios">
      <Header>
        <Tabs role="tablist">
          {(Object.keys(TABS) as View[]).map((key) => (
            <Tab
              key={key}
              type="button"
              role="tab"
              aria-selected={view === key}
              $active={view === key}
              onClick={() => setView(key)}
            >
              {TABS[key]}
            </Tab>
          ))}
        </Tabs>

        {hasTags && (
          <GroupSwitch role="group" aria-label="Agrupar por">
            {(Object.keys(GROUPS) as MasteryGroup[]).map((key) => (
              <GroupButton
                key={key}
                type="button"
                aria-pressed={activeGroup === key}
                $active={activeGroup === key}
                onClick={() => setGroup(key)}
              >
                {GROUPS[key].label}
              </GroupButton>
            ))}
          </GroupSwitch>
        )}
      </Header>

      {items.length > 0 ? (
        <>
          <WordCloud
            items={items}
            tone={view}
            ariaLabel={`${TABS[view]} (${GROUPS[activeGroup].label.toLowerCase()})`}
            onSelect={(item) => {
              const entry = entries.find((e) => e.id === item.id)
              if (entry) onSelect(entry, activeGroup)
            }}
          />
          <Hint>{copy.hint}</Hint>
        </>
      ) : (
        <Message>{copy.empty}</Message>
      )}
      <Hint>Aparece tras al menos {current.min_reviews} repasos.</Hint>
    </Wrapper>
  )
}
