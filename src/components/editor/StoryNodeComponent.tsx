import { Handle, Position, type NodeProps } from 'reactflow'

export function StoryNodeComponent({ data }: NodeProps<{ title: string; content: string }>) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div>{data.title}</div>
      <div>{data.content}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}