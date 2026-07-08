import { useCallback, useRef, useState } from 'react'
import { ReactFlowProvider, addEdge, useNodesState, useEdgesState, type Node, type Connection } from 'reactflow'
import { StoryFlow, initialNodes } from './components/editor/StoryFlow'
import { Toolbar } from './components/editor/Toolbar'
import { Inspector } from './components/inspector/Inspector'
import { ThemeProvider, useTheme } from './theme/ThemeContext'
import { ContextMenu, createContextMenuState, type ContextMenuState } from './components/editor/ContextMenu'
import { SettingsPanel } from './components/settings/SettingsPanel'
import { saveProject } from './services/ProjectManager'
import { exportToPng, exportToMarkdown, downloadMarkdown } from './services/ExportService'
import { createStoryNode, NodeType } from './models/StoryNode'
import type { ProjectData } from './services/ProjectManager'

function AppInner() {
  const { theme } = useTheme()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(createContextMenuState())
  const [showSettings, setShowSettings] = useState(false)
  const [settingsScrollToHelp, setSettingsScrollToHelp] = useState(false)
  const reactFlowWrapperRef = useRef<HTMLDivElement | null>(null)

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  const onNodeClick = useCallback((_event: any, node: Node) => {
    setSelectedNodeId(node.id)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null)
    setContextMenu(createContextMenuState())
  }, [])

  const onNodeContextMenu = useCallback((event: any, node: Node) => {
    event.preventDefault()
    setSelectedNodeId(node.id)
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      node,
    })
  }, [])

  const handleLoad = useCallback(
    (data: { nodes: Node[]; edges: Edge[] }) => {
      setNodes(data.nodes)
      setEdges(data.edges)
    },
    [setNodes, setEdges]
  )

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

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null

  const onSaveClick = () => {
    const data = saveProject(nodes, edges)
    localStorage.setItem('storyforge-project', JSON.stringify(data))
    alert('项目已保存！')
  }

  const onLoadClick = () => {
    const json = localStorage.getItem('storyforge-project')
    if (json) {
      const data: ProjectData = JSON.parse(json)
      handleLoad(data)
    } else {
      alert('没有找到已保存的项目')
    }
  }

  const onNewClick = () => {
    handleLoad({ nodes: initialNodes, edges: [] })
  }

  const onClearClick = () => {
    setNodes([])
    setEdges([])
    setSelectedNodeId(null)
  }

  const onAddNode = () => {
    const types = [NodeType.DIALOGUE, NodeType.CHOICE, NodeType.EVENT, NodeType.CONDITION, NodeType.ENDING, NodeType.NOTE]
    const type = types[Math.floor(Math.random() * types.length)]
    const label = type === NodeType.DIALOGUE ? '对话' : type === NodeType.CHOICE ? '选择' : type === NodeType.EVENT ? '事件' : type === NodeType.CONDITION ? '条件' : type === NodeType.ENDING ? '结局' : '备注'
    const newNode = createStoryNode({ type, title: `新${label}节点`, content: '' })
    const reactFlowNode: Node = {
      id: newNode.id,
      type: 'storyNode',
      position: {
        x: Math.random() * 300 + 100,
        y: Math.random() * 300 + 100,
      },
      data: newNode,
    }
    setNodes((nds) => [...nds, reactFlowNode])
  }

  const onExportPng = useCallback(() => {
    exportToPng(reactFlowWrapperRef.current)
  }, [])

  const onExportMarkdown = useCallback(() => {
    const md = exportToMarkdown(nodes, edges)
    downloadMarkdown(md)
  }, [nodes, edges])

  const onDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId))
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId))
    setSelectedNodeId((prev) => (prev === nodeId ? null : prev))
  }, [setNodes, setEdges])

  const onDuplicateNode = useCallback((node: Node) => {
    const newNode = createStoryNode({
      type: (node.data.type as NodeType) || NodeType.DIALOGUE,
      title: `${node.data.title} (副本)`,
      content: node.data.content ?? '',
    })
    const reactFlowNode: Node = {
      id: newNode.id,
      type: 'storyNode',
      position: { x: node.position.x + 50, y: node.position.y + 50 },
      data: newNode,
    }
    setNodes((nds) => [...nds, reactFlowNode])
  }, [setNodes])

  const onChangeNodeType = useCallback((nodeId: string, type: NodeType) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, type } } : n
      )
    )
  }, [setNodes])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'sans-serif',
        background: theme.bg,
        color: theme.text,
      }}
    >
      <header
        style={{
          background: theme.headerBg,
          color: theme.text,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderBottom: `1px solid ${theme.border}`,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>StoryForge - 故事编辑器</h1>
      </header>
      <Toolbar
        onNew={onNewClick}
        onSave={onSaveClick}
        onLoad={onLoadClick}
        onClear={onClearClick}
        onAddNode={onAddNode}
        onExportPng={onExportPng}
        onExportMarkdown={onExportMarkdown}
        onOpenSettings={() => { setShowSettings(true); setSettingsScrollToHelp(false) }}
        onOpenHelp={() => { setShowSettings(true); setSettingsScrollToHelp(true) }}
      />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1 }}>
          <ReactFlowProvider>
            <StoryFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onNodeContextMenu={onNodeContextMenu}
              reactFlowWrapperRef={reactFlowWrapperRef}
            />
          </ReactFlowProvider>
        </div>
        <Inspector selectedNode={selectedNode} onUpdateNode={updateNodeData} />
      </div>
      <ContextMenu
        menu={contextMenu}
        onClose={() => setContextMenu(createContextMenuState())}
        onDeleteNode={onDeleteNode}
        onDuplicateNode={onDuplicateNode}
        onChangeNodeType={onChangeNodeType}
      />
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} scrollToHelp={settingsScrollToHelp} />}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}

export default App