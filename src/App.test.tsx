import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('renders StoryForge title', () => {
    render(<App />)
    expect(screen.getByText('StoryForge - 故事编辑器')).toBeDefined()
  })

  it('T3: renders the editor layout with toolbar and story flow', () => {
    render(<App />)
    expect(screen.getByTestId('toolbar')).toBeDefined()
    expect(screen.getByTestId('story-flow')).toBeDefined()
  })
})