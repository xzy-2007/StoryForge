import { ReactFlowProvider } from 'reactflow'
import { StoryFlow } from './components/editor/StoryFlow'

function App() {
  return (
    <div>
      <h1>StoryForge</h1>
      <ReactFlowProvider>
        <StoryFlow />
      </ReactFlowProvider>
    </div>
  )
}

export default App