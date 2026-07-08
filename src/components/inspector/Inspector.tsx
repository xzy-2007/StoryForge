import { useCallback } from 'react'
import type { Node } from 'reactflow'

interface InspectorProps {
  selectedNode: Node | null
  onUpdateNode: (nodeId: string, data: Record<string, string>) => void
}

export function Inspector({ selectedNode, onUpdateNode }: InspectorProps) {
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!selectedNode) return
      onUpdateNode(selectedNode.id, {
        title: e.target.value,
        content: selectedNode.data.content ?? '',
        type: selectedNode.data.type ?? '',
      })
    },
    [selectedNode, onUpdateNode]
  )

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!selectedNode) return
      onUpdateNode(selectedNode.id, {
        title: selectedNode.data.title ?? '',
        content: e.target.value,
        type: selectedNode.data.type ?? '',
      })
    },
    [selectedNode, onUpdateNode]
  )

  if (!selectedNode) {
    return <div data-testid="inspector-empty">No node selected</div>
  }

  return (
    <div data-testid="inspector">
      <h3>Inspector</h3>
      <div>
        <label>Title</label>
        <input
          data-testid="inspector-title"
          value={selectedNode.data.title ?? ''}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          data-testid="inspector-content"
          value={selectedNode.data.content ?? ''}
          onChange={handleContentChange}
        />
      </div>
      <div>
        <label>Type</label>
        <div data-testid="inspector-type">{selectedNode.data.type ?? ''}</div>
      </div>
    </div>
  )
}