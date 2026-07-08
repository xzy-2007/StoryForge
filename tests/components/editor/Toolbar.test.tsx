import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Toolbar } from '../../../src/components/editor/Toolbar'
import { ThemeProvider } from '../../../src/theme/ThemeContext'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('Toolbar', () => {
  it('T1: renders toolbar buttons', () => {
    renderWithTheme(<Toolbar onAddNode={vi.fn()} onNew={vi.fn()} onSave={vi.fn()} onLoad={vi.fn()} onClear={vi.fn()} />)
    expect(screen.getByText('➕ 添加节点')).toBeDefined()
    expect(screen.getByText('💾 保存')).toBeDefined()
    expect(screen.getByText('📂 加载')).toBeDefined()
    expect(screen.getByText('🗑️ 清空')).toBeDefined()
  })
})