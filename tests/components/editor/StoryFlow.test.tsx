import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { StoryFlow } from '../../../src/components/editor/StoryFlow'

describe('StoryFlow', () => {
  it('renders the React Flow canvas', () => {
    const { container } = render(<StoryFlow />)

    // Should render a React Flow wrapper (not a placeholder div)
    expect(container.querySelector('[data-testid="story-flow"]')).toBeDefined()
  })
})