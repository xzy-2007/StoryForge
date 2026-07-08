import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from 'reactflow'
import { StoryNodeComponent } from '../../../src/components/editor/StoryNodeComponent'

function renderWithFlow(ui: React.ReactElement) {
  return render(<ReactFlowProvider>{ui}</ReactFlowProvider>)
}

describe('StoryNodeComponent', () => {
  it('renders the node title', () => {
    renderWithFlow(
      <StoryNodeComponent
        id="test-1"
        data={{ title: 'Opening Scene', content: 'Once upon a time...' }}
        selected={false}
        type="storyNode"
        xPos={0}
        yPos={0}
        dragging={false}
        zIndex={0}
        targetPosition="top"
        sourcePosition="bottom"
      />
    )

    expect(screen.getByText('Opening Scene')).toBeDefined()
  })

  it('renders the node content', () => {
    renderWithFlow(
      <StoryNodeComponent
        id="test-2"
        data={{ title: 'Choice', content: 'Make a decision' }}
        selected={false}
        type="storyNode"
        xPos={0}
        yPos={0}
        dragging={false}
        zIndex={0}
        targetPosition="top"
        sourcePosition="bottom"
      />
    )

    expect(screen.getByText('Make a decision')).toBeDefined()
  })
})