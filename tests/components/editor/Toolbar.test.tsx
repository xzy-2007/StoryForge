import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Toolbar } from '../../../src/components/editor/Toolbar'

describe('Toolbar', () => {
  it('T1: renders toolbar buttons', () => {
    render(<Toolbar />)
    expect(screen.getByText('New Node')).toBeDefined()
    expect(screen.getByText('Save')).toBeDefined()
    expect(screen.getByText('Load')).toBeDefined()
    expect(screen.getByText('Clear')).toBeDefined()
  })
})