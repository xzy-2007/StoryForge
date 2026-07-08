import { describe, it, expect } from 'vitest'
import { saveProject, loadProject } from '../../src/services/ProjectManager'
import type { Node, Edge } from 'reactflow'

const mockNodes: Node[] = [
  {
    id: 'n1',
    type: 'storyNode',
    position: { x: 100, y: 100 },
    data: { title: 'Node A', content: 'Content A', type: 'DIALOGUE' },
  },
  {
    id: 'n2',
    type: 'storyNode',
    position: { x: 300, y: 200 },
    data: { title: 'Node B', content: 'Content B', type: 'CHOICE' },
  },
]

const mockEdges: Edge[] = [
  { id: 'e1', source: 'n1', target: 'n2' },
]

describe('ProjectManager', () => {
  it('T1: serializes nodes and edges to JSON', () => {
    const data = saveProject(mockNodes, mockEdges)

    expect(data.version).toBe('1.0')
    expect(data.name).toBe('Untitled Project')
    expect(data.nodes).toEqual(mockNodes)
    expect(data.edges).toEqual(mockEdges)
  })

  it('T2: restores nodes and edges from JSON', () => {
    const projectData = {
      version: '1.0',
      name: 'Test Project',
      nodes: mockNodes,
      edges: mockEdges,
    }

    const { nodes, edges } = loadProject(projectData)

    expect(nodes).toHaveLength(2)
    expect(edges).toHaveLength(1)
    expect(nodes[0].data.title).toBe('Node A')
    expect(edges[0].source).toBe('n1')
    expect(edges[0].target).toBe('n2')
  })
})