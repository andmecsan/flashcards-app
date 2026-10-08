/** «1 tarjeta», «2 tarjetas». */
export const cardsLabel = (count: number): string =>
  `${count} ${count === 1 ? 'tarjeta' : 'tarjetas'}`
