import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReactFlowProvider } from 'reactflow'
import { StoryNodeComponent } from '../../../src/components/editor/StoryNodeComponent'
import { ThemeProvider } from '../../../src/theme/ThemeContext'

function renderWithFlow(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <ReactFlowProvider>{ui}</ReactFlowProvider>
    </ThemeProvider>
  )
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
        data={{ title: '开场场景', content: '很久很久以前...' }}
      />
    )

    expect(screen.getByText('开场场景')).toBeDefined()
  })

  it('renders the node content', () => {
    renderWithFlow(
      <StoryNodeComponent
        {...baseProps}
        id="test-2"
        data={{ title: '选择', content: '做个决定' }}
      />
    )

    expect(screen.getByText('做个决定')).toBeDefined()
  })

  it('T2: renders the node type label in Chinese', () => {
    renderWithFlow(
      <StoryNodeComponent
        {...baseProps}
        id="test-3"
        data={{ title: 'Test', content: 'Content', type: 'DIALOGUE' }}
      />
    )

    expect(screen.getByText('💬 对话')).toBeDefined()
  })
})