export interface ToolbarProps {
  onNew?: () => void
  onSave?: () => void
  onLoad?: () => void
  onClear?: () => void
}

export function Toolbar({ onNew, onSave, onLoad, onClear }: ToolbarProps) {
  return (
    <div data-testid="toolbar">
      <button onClick={onNew}>New Node</button>
      <button onClick={onSave}>Save</button>
      <button onClick={onLoad}>Load</button>
      <button onClick={onClear}>Clear</button>
    </div>
  )
}