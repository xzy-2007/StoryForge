import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('Build', () => {
  it('should compile successfully with npm run build', () => {
    expect(() =>
      execSync('npm run build', { stdio: 'pipe', encoding: 'utf-8' })
    ).not.toThrow()
  })
})