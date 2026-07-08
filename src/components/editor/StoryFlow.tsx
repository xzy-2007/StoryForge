import ReactFlow, { Background, Controls, type Node } from 'reactflow'
import 'reactflow/dist/style.css'
import { StoryNodeComponent } from './StoryNodeComponent'

const nodeTypes = {
  storyNode: StoryNodeComponent,
}

const defaultNodes: Node[] = [
  {
    id: 'opening',
    type: 'storyNode',
    position: { x: 250, y: 100 },
    data: {
      title: 'Opening Scene',
      content: 'Once upon a time...'
    }
  }
]

export function StoryFlow() {
  return (
    <div data-testid="story-flow" style={{ width: '100%', height: 500 }}>
      <ReactFlow
        nodes={defaultNodes}
        edges={[]}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}