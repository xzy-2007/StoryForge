import { ReactFlowProvider } from 'reactflow'
import { StoryFlow, initialNodes, useStoryFlowState } from './components/editor/StoryFlow'
import { loadProject, type ProjectData } from './services/ProjectManager'

function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, handleSave, handleLoad } =
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

  return (
    <div>
      <h1>StoryForge</h1>
      <div>
        <button onClick={onNewClick}>New</button>
        <button onClick={onSaveClick}>Save</button>
        <button onClick={onLoadClick}>Load</button>
      </div>
      <ReactFlowProvider>
        <StoryFlow />
      </ReactFlowProvider>
    </div>
  )
}

export default App