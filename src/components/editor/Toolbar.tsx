import type { CSSProperties } from 'react'
import { useTheme } from '../../theme/ThemeContext'

export interface ToolbarProps {
  onNew?: () => void
  onSave?: () => void
  onLoad?: () => void
  onClear?: () => void
  onAddNode?: () => void
  onExportPng?: () => void
  onExportMarkdown?: () => void
  onOpenSettings?: () => void
  onOpenHelp?: () => void
}

export function Toolbar({ onNew, onSave, onLoad, onClear, onAddNode, onExportPng, onExportMarkdown, onOpenSettings, onOpenHelp }: ToolbarProps) {
  const { theme } = useTheme()

  const btnStyle: CSSProperties = {
    background: theme.inputBg,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    padding: '6px 14px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 13,
  }

  return (
    <div
      data-testid="toolbar"
      style={{
        background: theme.toolbarBg,
        padding: '8px 16px',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        borderBottom: `1px solid ${theme.border}`,
        flexWrap: 'wrap',
      }}
    >
      <button onClick={onAddNode} style={btnStyle}>➕ 添加节点</button>
      <span style={{ color: theme.border, opacity: 0.5 }}>|</span>
      <button onClick={onNew} style={btnStyle}>🔄 重置</button>
      <button onClick={onSave} style={btnStyle}>💾 保存</button>
      <button onClick={onLoad} style={btnStyle}>📂 加载</button>
      <button onClick={onClear} style={btnStyle}>🗑️ 清空</button>

      <span style={{ color: theme.border, opacity: 0.5 }}>|</span>
      <button onClick={onExportPng} style={btnStyle}>🖼️ 导出 PNG</button>
      <button onClick={onExportMarkdown} style={btnStyle}>📄 导出 Markdown</button>

      <span style={{ color: theme.border, opacity: 0.5 }}>|</span>
      <button onClick={onOpenSettings} style={{ ...btnStyle, background: theme.surfaceAlt }}>⚙️ 设置</button>
      <button onClick={onOpenHelp} style={btnStyle}>❓ 帮助</button>

      <span style={{ marginLeft: 'auto', color: theme.textSecondary, fontSize: 11, opacity: 0.6 }}>
        框选 / Shift多选 | 右键菜单 | Delete 删除
      </span>
    </div>
  )
}