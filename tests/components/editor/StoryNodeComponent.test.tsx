import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from 'reactflow'
import { StoryNodeComponent } from '../../../src/components/editor/StoryNodeComponent'

function renderWithFlow(ui: React.ReactElement) {
  return render(<ReactFlowProvider>{ui}</ReactFlowProvider>)
}

const baseProps = {
  selected: false,
  type: 'storyNode' as const,
  xPos: 0,
  yPos: 0,
  dragging: false,
  zIndex: 0,
  targetPosition: 'top' as const,
  sourcePosition: 'bottom' as const,
}

describe('StoryNodeComponent', () => {
  it('renders the node title', () => {
    renderWithFlow(
      <StoryNodeComponent
        {...baseProps}
        id="test-1"
        data={{ title: 'Opening Scene', content: 'Once upon a time...' }}
      />
    )

    expect(screen.getByText('Opening Scene')).toBeDefined()
  })

  it('renders the node content', () => {
    renderWithFlow(
      <StoryNodeComponent
        {...baseProps}
        id="test-2"
        data={{ title: 'Choice', content: 'Make a decision' }}
      />
    )

    expect(screen.getByText('Make a decision')).toBeDefined()
  })

  it('T2: renders the node type label', () => {
    renderWithFlow(
      <StoryNodeComponent
        {...baseProps}
        id="test-3"
        data={{ title: 'Test', content: 'Content', type: 'DIALOGUE' }}
      />
    )

    expect(screen.getByText('DIALOGUE')).toBeDefined()
  })
})