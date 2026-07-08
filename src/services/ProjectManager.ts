import type { Node, Edge } from 'reactflow'

export interface ProjectData {
  version: string
  name: string
  nodes: Node[]
  edges: Edge[]
}

export function saveProject(nodes: Node[], edges: Edge[]): ProjectData {
  return {
    version: '1.0',
    name: 'Untitled Project',
    nodes,
    edges,
  }
}

export function loadProject(data: ProjectData): { nodes: Node[]; edges: Edge[] } {
  return {
    nodes: data.nodes,
    edges: data.edges,
  }
}