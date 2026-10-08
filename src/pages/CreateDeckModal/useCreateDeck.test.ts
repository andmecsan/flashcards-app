import { describe, it, expect } from 'vitest'
import { toPayload } from './useCreateDeck'

describe('toPayload', () => {
  it('traduce el área, nivel y curso a los nombres del API, con vacío para quitarlos', () => {
    expect(toPayload({ name: 'Biología', icon: '🧬', color: '#10B981', areaId: '4', levelId: '', courseId: '9' })).toEqual({
      name: 'Biología', icon: '🧬', color: '#10B981', area_id: '4', level_id: '', course_id: '9',
    })
  })
})
