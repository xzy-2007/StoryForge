import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('renders StoryForge title', () => {
    render(<App />)
    expect(screen.getByText('StoryForge')).toBeDefined()
  })
})