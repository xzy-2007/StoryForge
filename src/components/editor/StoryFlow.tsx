import { useCallback, type MouseEvent as ReactMouseEvent } from 'react'
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
  type OnConnect,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { StoryNodeComponent } from './StoryNodeComponent'
import { saveProject, type ProjectData } from '../../services/ProjectManager'

const nodeTypes = {
  storyNode: StoryNodeComponent,
}

export const initialNodes: Node[] = [
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

export function useStoryFlowState(initialNodesList: Node[] = initialNodes) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesList)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  const handleSave = useCallback((): ProjectData => {
    return saveProject(nodes, edges)
  }, [nodes, edges])

  const handleLoad = useCallback(
    (data: { nodes: Node[]; edges: Edge[] }) => {
      setNodes(data.nodes)
      setEdges(data.edges)
    },
    [setNodes, setEdges]
  )

  const selectedNode = nodes.find((n) => n.selected) ?? null

  const onNodeClick = useCallback((_event: ReactMouseEvent, node: Node) => {
    // selection is handled by onNodesChange, this is for additional click handling
  }, [])

  const onPaneClick = useCallback(() => {
    // deselect handled by onNodesChange
  }, [])

  const updateNodeData = useCallback(
    (nodeId: string, data: Record<string, string>) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n
        )
      )
    },
    [setNodes]
  )

  return { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, handleSave, handleLoad, selectedNode, onNodeClick, onPaneClick, updateNodeData }
}

export function StoryFlow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStoryFlowState()

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