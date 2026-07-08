export enum NodeType {
  DIALOGUE = 'DIALOGUE',
  CHOICE = 'CHOICE'
}

export interface StoryNode {
  id: string
  type: NodeType
  title: string
  content: string
}

let counter = 0

export function createStoryNode(
  params: { type: NodeType; title: string; content?: string }
): StoryNode {
  return {
    id: `story-node-${++counter}-${Date.now()}`,
    type: params.type,
    title: params.title,
    content: params.content ?? ''
  }
}