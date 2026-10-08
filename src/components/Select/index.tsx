import { Fragment, useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'
import { Wrapper, Label, Trigger, Value, List, GroupTitle, Option } from './styles'
import type { SelectProps } from './types'

const MAX_LIST_HEIGHT = 288 // 18rem
const GAP = 4
const TYPEAHEAD_RESET_MS = 600

interface Position {
  top?: number
  bottom?: number
  /** Se ancla por la izquierda, o por la derecha si el botón está en la mitad derecha. */
  left?: number
  right?: number
  minWidth: number
  maxHeight: number
}

/**
 * Desplegable propio, accesible (patrón «select-only combobox» de WAI-ARIA):
 * teclado completo (flechas, Inicio/Fin, Intro/Espacio, Escape y escribir para
 * buscar), cierre al hacer clic fuera y lista en un portal para no recortarse
 * dentro de modales con scroll.
 */
export const Select = ({
  options,
  value,
  onChange,
  label,
  ariaLabel,
  placeholder = 'Elige una opción…',
  disabled = false,
  maxWidth,
}: SelectProps) => {
  const id = useId()
  const labelId = `${id}-label`
  const listId = `${id}-list`
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const typed = useRef({ text: '', timer: 0 })

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const [position, setPosition] = useState<Position | null>(null)

  const selectedIndex = options.findIndex((option) => option.value === value)
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined
  const enabled = useMemo(
    () => options.map((option, index) => (option.disabled ? -1 : index)).filter((index) => index >= 0),
    [options],
  )

  const close = useCallback(() => setOpen(false), [])

  const openList = () => {
    if (disabled || enabled.length === 0) return
    setActive(selected && !selected.disabled ? selectedIndex : enabled[0])
    setOpen(true)
  }

  const choose = (index: number) => {
    const option = options[index]
    if (!option || option.disabled) return
    onChange(option.value)
    close()
    triggerRef.current?.focus()
  }

  // Posición bajo el botón, o encima si abajo no cabe.
  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const below = window.innerHeight - rect.bottom - GAP - 8
    const above = rect.top - GAP - 8
    const flip = below < Math.min(MAX_LIST_HEIGHT, 160) && above > below
    const horizontal =
      rect.left + rect.width / 2 > window.innerWidth / 2
        ? { right: window.innerWidth - rect.right }
        : { left: rect.left }
    setPosition({
      ...horizontal,
      ...(flip
        ? { bottom: window.innerHeight - rect.top + GAP }
        : { top: rect.bottom + GAP }),
      minWidth: rect.width,
      maxHeight: Math.min(MAX_LIST_HEIGHT, flip ? above : below),
    })
  }, [open])

  // Cierra al hacer clic fuera, al redimensionar o al hacer scroll fuera de la lista.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (!triggerRef.current?.contains(target) && !listRef.current?.contains(target)) close()
    }
    const onScroll = (e: Event) => {
      if (!listRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', onPointerDown)
    window.addEventListener('resize', close)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('resize', close)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [open, close])

  // Mantiene visible la opción activa al moverse con el teclado.
  useEffect(() => {
    if (open && position && active >= 0) {
      document.getElementById(`${id}-opt-${active}`)?.scrollIntoView?.({ block: 'nearest' })
    }
  }, [open, position, active, id])

  const move = (step: 1 | -1) => {
    const at = enabled.indexOf(active)
    const next = at === -1 ? 0 : (at + step + enabled.length) % enabled.length
    setActive(enabled[next])
  }

  const typeahead = (char: string) => {
    window.clearTimeout(typed.current.timer)
    typed.current.text += char.toLowerCase()
    typed.current.timer = window.setTimeout(() => (typed.current.text = ''), TYPEAHEAD_RESET_MS)

    const start = Math.max(enabled.indexOf(active), 0)
    const ordered = [...enabled.slice(start), ...enabled.slice(0, start)]
    const found = ordered.find((index) => options[index].label.toLowerCase().startsWith(typed.current.text))
    if (found !== undefined) {
      if (!open) setOpen(true)
      setActive(found)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openList()
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        typeahead(e.key)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); move(1); break
      case 'ArrowUp': e.preventDefault(); move(-1); break
      case 'Home': e.preventDefault(); setActive(enabled[0]); break
      case 'End': e.preventDefault(); setActive(enabled[enabled.length - 1]); break
      case 'Enter':
      case ' ': e.preventDefault(); if (active >= 0) choose(active); break
      case 'Escape': e.preventDefault(); close(); break
      case 'Tab': close(); break
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) typeahead(e.key)
    }
  }

  return (
    <Wrapper $maxWidth={maxWidth}>
      {label && <Label id={labelId}>{label}</Label>}
      <Trigger
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : ariaLabel}
        disabled={disabled}
        $open={open}
        onClick={() => (open ? close() : openList())}
        onKeyDown={handleKeyDown}
      >
        <Value $placeholder={!selected}>{selected ? selected.label : placeholder}</Value>
        <ChevronDown size={16} aria-hidden="true" />
      </Trigger>

      {open &&
        createPortal(
          <List
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
            aria-label={label ? undefined : ariaLabel}
            style={position ?? { visibility: 'hidden' }}
            // Evita que el botón pierda el foco al pulsar una opción.
            onMouseDown={(e) => e.preventDefault()}
          >
            {options.map((option, index) => (
              <Fragment key={option.value || `empty-${index}`}>
                {option.group && option.group !== options[index - 1]?.group && (
                  <GroupTitle role="presentation">{option.group}</GroupTitle>
                )}
                <Option
                  id={`${id}-opt-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  aria-disabled={option.disabled || undefined}
                  $active={index === active}
                  $selected={index === selectedIndex}
                  $disabled={!!option.disabled}
                  onMouseEnter={() => !option.disabled && setActive(index)}
                  onClick={() => choose(index)}
                >
                  {option.label}
                  {index === selectedIndex && <Check size={14} aria-hidden="true" />}
                </Option>
              </Fragment>
            ))}
          </List>,
          document.body,
        )}
    </Wrapper>
  )
}
