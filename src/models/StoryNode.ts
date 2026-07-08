export enum NodeType {
  DIALOGUE = 'DIALOGUE',
  CHOICE = 'CHOICE',
  EVENT = 'EVENT',
  CONDITION = 'CONDITION',
  ENDING = 'ENDING',
  NOTE = 'NOTE',
}

export const NodeTypeLabel: Record<NodeType, string> = {
  [NodeType.DIALOGUE]: '💬 对话',
  [NodeType.CHOICE]: '🔀 选择',
  [NodeType.EVENT]: '📌 事件',
  [NodeType.CONDITION]: '❓ 条件',
  [NodeType.ENDING]: '🏁 结局',
  [NodeType.NOTE]: '📝 备注',
}

export const NodeTypeColor: Record<NodeType, string> = {
  [NodeType.DIALOGUE]: '#4fc3f7',
  [NodeType.CHOICE]: '#ffb74d',
  [NodeType.EVENT]: '#81c784',
  [NodeType.CONDITION]: '#ce93d8',
  [NodeType.ENDING]: '#ef5350',
  [NodeType.NOTE]: '#90a4ae',
}

export enum NodeShape {
  ROUNDED = 'rounded',
  PILL = 'pill',
  CARD = 'card',
}

export const NodeShapeLabel: Record<NodeShape, string> = {
  [NodeShape.ROUNDED]: '圆角矩形',
  [NodeShape.PILL]: '胶囊形',
  [NodeShape.CARD]: '卡片式',
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
    content: params.content ?? '',
  }
}