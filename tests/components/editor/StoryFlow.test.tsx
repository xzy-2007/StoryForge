import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ReactFlowProvider, useReactFlow, type ReactFlowInstance } from 'reactflow'
import { StoryFlow } from '../../../src/components/editor/StoryFlow'

let rfInstance: ReactFlowInstance | null = null

function InstanceCapturer() {
  const instance = useReactFlow()
  rfInstance = instance
  return null
}

function renderWithFlow(ui: React.ReactElement) {
  return render(<ReactFlowProvider>{ui}</ReactFlowProvider>)
}

describe('StoryFlow', () => {
  beforeEach(() => {
    rfInstance = null
  })

  it('T1: renders with initial nodes', () => {
    renderWithFlow(<StoryFlow />)
    expect(screen.getByText('Opening Scene')).toBeDefined()
  })

  it('T2: can add edges between nodes', () => {
    renderWithFlow(
      <>
        <StoryFlow />
        <InstanceCapturer />
      </>
    )

    expect(rfInstance).not.toBeNull()

    act(() => {
      rfInstance!.addEdges([{ id: 'e1', source: 'opening', target: 'opening' }])
    })

    const edges = rfInstance!.getEdges()
    expect(edges).toHaveLength(1)
  })

  it('T3: can remove edges', () => {
    renderWithFlow(
      <>
        <StoryFlow />
        <InstanceCapturer />
      </>
    )

    act(() => {
      rfInstance!.addEdges([{ id: 'e1', source: 'opening', target: 'opening' }])
    })
    expect(rfInstance!.getEdges()).toHaveLength(1)

    act(() => {
      rfInstance!.deleteElements({ edges: [{ id: 'e1' }] })
    })
    expect(rfInstance!.getEdges()).toHaveLength(0)
  })
})