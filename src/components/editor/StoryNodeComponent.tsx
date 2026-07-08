import { Handle, Position, type NodeProps } from 'reactflow'

interface StoryNodeData {
  title: string
  content: string
  type?: string
}

export function StoryNodeComponent({ data }: NodeProps<StoryNodeData>) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      {data.type && <div>{data.type}</div>}
      <div>{data.title}</div>
      <div>{data.content}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}