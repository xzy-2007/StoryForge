import { useCallback } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { StoryFlow, initialNodes, useStoryFlowState } from './components/editor/StoryFlow'
import { Toolbar } from './components/editor/Toolbar'
import { loadProject, type ProjectData } from './services/ProjectManager'

function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, handleSave, handleLoad, setNodes, setEdges } =
    useStoryFlowState(initialNodes)

  const onSaveClick = () => {
    const data = handleSave()
    console.log('Save:', JSON.stringify(data, null, 2))
  }

  const onLoadClick = () => {
    const json = localStorage.getItem('storyforge-project')
    if (json) {
      const data: ProjectData = JSON.parse(json)
      handleLoad(loadProject(data))
    }
  }

  const onNewClick = () => {
    handleLoad(loadProject({ version: '1.0', name: 'Untitled Project', nodes: initialNodes, edges: [] }))
  }

  const onClearClick = () => {
    setNodes([])
    setEdges([])
  }

  return (
    <div data-testid="editor-layout">
      <h1>StoryForge</h1>
      <Toolbar onNew={onNewClick} onSave={onSaveClick} onLoad={onLoadClick} onClear={onClearClick} />
      <ReactFlowProvider>
        <StoryFlow />
      </ReactFlowProvider>
    </div>
  )
}

export default App