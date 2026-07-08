import { describe, it, expect } from 'vitest'
import { createStoryNode, NodeType } from '../../src/models/StoryNode'

describe('StoryNode model', () => {
  it('creates a dialogue node with auto-generated id', () => {
    const node = createStoryNode({ type: NodeType.DIALOGUE, title: 'Hello', content: 'World' })

    // id should be non-empty and unique
    expect(node.id).toBeTruthy()
    expect(typeof node.id).toBe('string')
    expect(node.id.length).toBeGreaterThan(0)

    expect(node.type).toBe(NodeType.DIALOGUE)
    expect(node.title).toBe('Hello')
    expect(node.content).toBe('World')
  })

  it('creates a choice node', () => {
    const node = createStoryNode({ type: NodeType.CHOICE, title: 'Pick', content: 'Choose one' })

    expect(node.type).toBe(NodeType.CHOICE)
    expect(node.title).toBe('Pick')
    expect(node.content).toBe('Choose one')
  })
})