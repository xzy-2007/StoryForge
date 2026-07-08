import { useCallback, useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import { NodeShape, NodeShapeLabel } from '../../models/StoryNode'

interface SettingsPanelProps {
  onClose: () => void
  scrollToHelp?: boolean
}

const presetColors = [
  '#4fc3f7', '#ffb74d', '#66bb6a', '#ab47bc', '#ef5350', '#78909c',
  '#ff8a65', '#ffd54f', '#a5d6a7', '#b39ddb', '#4db6ac', '#ba68c8',
  '#e0e0e0', '#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0',
]

const colorKeys = [
  { key: 'bg', label: '背景色' },
  { key: 'surface', label: '面板色' },
  { key: 'border', label: '边框色' },
  { key: 'text', label: '文字色' },
  { key: 'textSecondary', label: '次要文字' },
  { key: 'nodeDialogue', label: '对话节点' },
  { key: 'nodeChoice', label: '选择节点' },
  { key: 'nodeEvent', label: '事件节点' },
  { key: 'nodeCondition', label: '条件节点' },
  { key: 'nodeEnding', label: '结局节点' },
  { key: 'nodeNote', label: '备注节点' },
]

export function SettingsPanel({ onClose, scrollToHelp }: SettingsPanelProps) {
  const { theme, allThemes, setTheme, customColors, setCustomColor, resetCustomColors, nodeShape, setNodeShape } = useTheme()
  const helpRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollToHelp && helpRef.current) {
      helpRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [scrollToHelp])

  const labelStyle: CSSProperties = {
    display: 'block', fontSize: 11, color: theme.textSecondary, marginBottom: 4, marginTop: 12,
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          background: theme.surface,
          color: theme.text,
          borderRadius: 10,
          width: 520,
          maxHeight: '80vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          border: `1px solid ${theme.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: `1px solid ${theme.border}` }}>
          <h2 style={{ margin: 0, fontSize: 16, flex: 1 }}>{scrollToHelp ? '❓ 使用说明' : '⚙️ 设置'}</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: theme.textSecondary, cursor: 'pointer', fontSize: 18 }}>✕</button>
        </div>

        <div style={{ padding: '0 18px 18px', overflowY: 'auto', flex: 1 }}>
          <div style={labelStyle}>主题配色</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {allThemes.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                style={{
                  background: t.surfaceAlt,
                  color: t.text,
                  border: theme.name === t.name ? `2px solid ${t.nodeDialogue}` : `1px solid ${t.border}`,
                  padding: '6px 14px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={labelStyle}>自定义颜色 <span style={{ fontSize: 10, color: theme.textSecondary, opacity: 0.6 }}>（点击色块自定义）</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
            {colorKeys.map(({ key, label }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
                <span style={{ fontSize: 11, width: 70, color: theme.textSecondary }}>{label}</span>
                <input
                  type="color"
                  value={customColors[key] || (theme as any)[key] || '#000000'}
                  onChange={(e) => setCustomColor(key, e.target.value)}
                  style={{ width: 28, height: 28, border: 'none', cursor: 'pointer', padding: 0, background: 'transparent' }}
                />
                <span style={{ fontSize: 10, color: theme.textSecondary, fontFamily: 'monospace' }}>
                  {customColors[key] || (theme as any)[key] || ''}
                </span>
              </div>
            ))}
          </div>
          {Object.keys(customColors).length > 0 && (
            <button
              onClick={resetCustomColors}
              style={{
                background: 'transparent',
                border: `1px solid ${theme.border}`,
                color: theme.textSecondary,
                padding: '4px 12px',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 11,
                marginTop: 8,
              }}
            >
              重置自定义颜色
            </button>
          )}

          <div style={labelStyle}>节点样式</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(NodeShapeLabel).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setNodeShape(value)}
                style={{
                  background: theme.inputBg,
                  color: theme.text,
                  border: nodeShape === value ? `2px solid ${theme.nodeDialogue}` : `1px solid ${theme.border}`,
                  padding: '6px 14px',
                  borderRadius: value === 'pill' ? 20 : value === 'rounded' ? 8 : 6,
                  cursor: 'pointer',
                  fontSize: 12,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div ref={helpRef} style={labelStyle}>使用说明</div>
          <div style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.7, background: theme.inputBg, padding: '10px 14px', borderRadius: 6, marginTop: 4 }}>
            <strong>StoryForge - 可视化故事节点编辑器</strong><br /><br />
            <strong>📖 基本操作</strong><br />
            • <strong>添加节点</strong>：点击工具栏「➕ 添加节点」按钮<br />
            • <strong>连接节点</strong>：从一个节点的底部端口拖拽到另一个节点的顶部端口<br />
            • <strong>删除节点/连线</strong>：选中后按 <code>Delete</code> 键<br />
            • <strong>编辑属性</strong>：点击节点，在右侧面板修改标题、内容、类型<br />
            • <strong>移动节点</strong>：拖拽节点到任意位置<br />
            • <strong>批量选择</strong>：在画布空白处拖拽框选，或按住 Shift 点击多个节点<br />
            • <strong>批量移动</strong>：框选多个节点后，拖拽任意一个即可整体移动<br />
            • <strong>右键菜单</strong>：右键点击节点可切换类型、复制、删除<br /><br />
            <strong>💾 保存/加载</strong><br />
            • 项目自动保存到浏览器本地存储<br />
            • 点击「保存」手动存储，点击「加载」恢复<br /><br />
            <strong>🖼️ 导出</strong><br />
            • <strong>PNG</strong>：导出画布为高清图片（仅节点区域）<br />
            • <strong>Markdown</strong>：导出为结构化文档，包含节点列表和连接关系<br /><br />
            <strong>🎨 个性化</strong><br />
            • 在设置面板中切换主题配色或自定义颜色<br />
            • 可更改节点形状（圆角矩形/胶囊形/卡片式）<br />
          </div>
        </div>
      </div>
    </div>
  )
}