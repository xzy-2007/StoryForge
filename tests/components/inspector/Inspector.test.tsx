import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Inspector } from '../../../src/components/inspector/Inspector'
import { ThemeProvider } from '../../../src/theme/ThemeContext'

const mockNode = {
  id: 'n1',
  data: { title: 'Test Title', content: 'Test Content', type: 'DIALOGUE' },
}

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('Inspector', () => {
  it('T1: displays selected node title', () => {
    renderWithTheme(<Inspector selectedNode={mockNode} onUpdateNode={vi.fn()} />)
    expect(screen.getByDisplayValue('Test Title')).toBeDefined()
  })

  it('T2: displays selected node content', () => {
    renderWithTheme(<Inspector selectedNode={mockNode} onUpdateNode={vi.fn()} />)
    expect(screen.getByDisplayValue('Test Content')).toBeDefined()
  })

  it('T3: calls onUpdateNode when title is changed', () => {
    const onUpdateNode = vi.fn()
    renderWithTheme(<Inspector selectedNode={mockNode} onUpdateNode={onUpdateNode} />)

    const input = screen.getByDisplayValue('Test Title')
    fireEvent.change(input, { target: { value: 'New Title' } })

    expect(onUpdateNode).toHaveBeenCalledWith('n1', {
      title: 'New Title',
      content: 'Test Content',
      type: 'DIALOGUE',
    })
  })
})