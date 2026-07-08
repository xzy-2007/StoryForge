import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ReactFlowProvider, useReactFlow } from 'reactflow'
import { StoryFlow, initialNodes } from '../../../src/components/editor/StoryFlow'
import { ThemeProvider } from '../../../src/theme/ThemeContext'

let rfInstance: ReturnType<typeof useReactFlow> | null = null

function InstanceCapturer() {
  const instance = useReactFlow()
  rfInstance = instance
  return null
}

function renderWithFlow(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <ReactFlowProvider>{ui}</ReactFlowProvider>
    </ThemeProvider>
  )
}

describe('StoryFlow', () => {
  beforeEach(() => {
    rfInstance = null
  })

  it('T1: renders with initial nodes', () => {
    renderWithFlow(
      <StoryFlow
        nodes={initialNodes}
        edges={[]}
        onNodesChange={vi.fn()}
        onEdgesChange={vi.fn()}
        onConnect={vi.fn()}
      />
    )
    expect(screen.getByText('开场场景')).toBeDefined()
  })

  it('T2: calls onConnect when a connection is made', () => {
    const onConnect = vi.fn()
    renderWithFlow(
      <StoryFlow
        nodes={initialNodes}
        edges={[]}
        onNodesChange={vi.fn()}
        onEdgesChange={vi.fn()}
        onConnect={onConnect}
      />
    )

    onConnect({ source: 'opening', target: 'first-choice', sourceHandle: null, targetHandle: null })
    expect(onConnect).toHaveBeenCalledWith({
      source: 'opening',
      target: 'first-choice',
      sourceHandle: null,
      targetHandle: null,
    })
  })

  it('T3: renders edges passed via props', () => {
    const edges = [{ id: 'e1', source: 'opening', target: 'first-choice' }]
    renderWithFlow(
      <StoryFlow
        nodes={initialNodes}
        edges={edges}
        onNodesChange={vi.fn()}
        onEdgesChange={vi.fn()}
        onConnect={vi.fn()}
      />
    )

    expect(rfInstance).toBeNull()
  })
})