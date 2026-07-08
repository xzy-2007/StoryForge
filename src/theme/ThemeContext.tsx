import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export interface ThemeColors {
  name: string
  label: string
  bg: string
  surface: string
  surfaceAlt: string
  headerBg: string
  toolbarBg: string
  border: string
  text: string
  textSecondary: string
  inputBg: string
  inputBorder: string
  nodeBg: string
  nodeDialogue: string
  nodeChoice: string
  nodeEvent: string
  nodeCondition: string
  nodeEnding: string
  nodeNote: string
}

const themes: ThemeColors[] = [
  {
    name: 'default',
    label: '深蓝',
    bg: '#0d1321',
    surface: '#1a1a2e',
    surfaceAlt: '#16213e',
    headerBg: '#0f1629',
    toolbarBg: '#121a30',
    border: '#0f3460',
    text: '#e8e8f0',
    textSecondary: '#8899b0',
    inputBg: '#0f1a30',
    inputBorder: '#1a3050',
    nodeBg: '#1a2538',
    nodeDialogue: '#4fc3f7',
    nodeChoice: '#ffb74d',
    nodeEvent: '#66bb6a',
    nodeCondition: '#ab47bc',
    nodeEnding: '#ef5350',
    nodeNote: '#78909c',
  },
  {
    name: 'forest',
    label: '森林',
    bg: '#0a1a12',
    surface: '#0f2418',
    surfaceAlt: '#143020',
    headerBg: '#0c1e14',
    toolbarBg: '#0e2216',
    border: '#1b5e3f',
    text: '#d4ecd4',
    textSecondary: '#7aaa88',
    inputBg: '#0d2216',
    inputBorder: '#1a4530',
    nodeBg: '#143020',
    nodeDialogue: '#4dd0a8',
    nodeChoice: '#ffcc80',
    nodeEvent: '#66bb6a',
    nodeCondition: '#ab8fd6',
    nodeEnding: '#ef5350',
    nodeNote: '#78909c',
  },
  {
    name: 'sunset',
    label: '日落',
    bg: '#1a0a08',
    surface: '#2e1410',
    surfaceAlt: '#3d1c16',
    headerBg: '#1f0d0a',
    toolbarBg: '#24100c',
    border: '#6b2e22',
    text: '#f0d8cc',
    textSecondary: '#b8887a',
    inputBg: '#2a1410',
    inputBorder: '#4a2820',
    nodeBg: '#3d1c16',
    nodeDialogue: '#ff8a65',
    nodeChoice: '#ffd54f',
    nodeEvent: '#a5d6a7',
    nodeCondition: '#b39ddb',
    nodeEnding: '#ef5350',
    nodeNote: '#8d6e63',
  },
  {
    name: 'ocean',
    label: '海洋',
    bg: '#081220',
    surface: '#0c1e36',
    surfaceAlt: '#0f2850',
    headerBg: '#091626',
    toolbarBg: '#0a1830',
    border: '#1a4a7a',
    text: '#d0e4f8',
    textSecondary: '#6090c0',
    inputBg: '#0c1e36',
    inputBorder: '#163a60',
    nodeBg: '#0f2850',
    nodeDialogue: '#4fc3f7',
    nodeChoice: '#ffb74d',
    nodeEvent: '#4db6ac',
    nodeCondition: '#7e57c2',
    nodeEnding: '#ef5350',
    nodeNote: '#607d8b',
  },
  {
    name: 'midnight',
    label: '暗夜',
    bg: '#0a0a18',
    surface: '#14142a',
    surfaceAlt: '#1c1a38',
    headerBg: '#0c0c1e',
    toolbarBg: '#0e0e22',
    border: '#3a2a6a',
    text: '#d8d0f0',
    textSecondary: '#8878b0',
    inputBg: '#12102a',
    inputBorder: '#282050',
    nodeBg: '#1c1a38',
    nodeDialogue: '#64b5f6',
    nodeChoice: '#ffb74d',
    nodeEvent: '#81c784',
    nodeCondition: '#ba68c8',
    nodeEnding: '#ef5350',
    nodeNote: '#78909c',
  },
]

interface CustomColors {
  [key: string]: string
}

interface ThemeContextValue {
  theme: ThemeColors
  allThemes: ThemeColors[]
  setTheme: (name: string) => void
  customColors: CustomColors
  setCustomColor: (key: string, value: string) => void
  resetCustomColors: () => void
  nodeShape: string
  setNodeShape: (shape: string) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function loadCustomColors(): CustomColors {
  try {
    const saved = localStorage.getItem('storyforge-custom-colors')
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function applyCustomColors(theme: ThemeColors, custom: CustomColors): ThemeColors {
  if (Object.keys(custom).length === 0) return theme
  return { ...theme, ...custom }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<string>(() => {
    return localStorage.getItem('storyforge-theme') || 'default'
  })
  const [customColors, setCustomColors] = useState<CustomColors>(loadCustomColors)
  const [nodeShape, setNodeShape] = useState<string>(() => {
    return localStorage.getItem('storyforge-node-shape') || 'rounded'
  })

  const baseTheme = themes.find((t) => t.name === themeName) || themes[0]
  const theme = applyCustomColors(baseTheme, customColors)

  const setTheme = useCallback((name: string) => {
    setThemeName(name)
    localStorage.setItem('storyforge-theme', name)
  }, [])

  const setCustomColor = useCallback((key: string, value: string) => {
    setCustomColors((prev) => {
      const next = { ...prev, [key]: value }
      localStorage.setItem('storyforge-custom-colors', JSON.stringify(next))
      return next
    })
  }, [])

  const resetCustomColors = useCallback(() => {
    setCustomColors({})
    localStorage.removeItem('storyforge-custom-colors')
  }, [])

  const handleSetNodeShape = useCallback((shape: string) => {
    setNodeShape(shape)
    localStorage.setItem('storyforge-node-shape', shape)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, allThemes: themes, setTheme, customColors, setCustomColor, resetCustomColors, nodeShape, setNodeShape: handleSetNodeShape }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}