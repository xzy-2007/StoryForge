import { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Connection,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { StoryNodeComponent } from './StoryNodeComponent'

const nodeTypes = {
  storyNode: StoryNodeComponent,
}

const initialNodes: Node[] = [
  {
    id: 'opening',
    type: 'storyNode',
    position: { x: 150, y: 100 },
    data: {
      title: 'Opening Scene',
      content: 'Once upon a time...',
      type: 'DIALOGUE',
    },
  },
  {
    id: 'first-choice',
    type: 'storyNode',
    position: { x: 450, y: 200 },
    data: {
      title: 'First Choice',
      content: 'What happens next?',
      type: 'CHOICE',
    },
  },
]

export function StoryFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  return (
    <div data-testid="story-flow" style={{ width: '100%', height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}