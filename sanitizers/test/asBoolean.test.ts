import { expect } from 'chai'
import { asBoolean, Either } from '../src'

describe('asBoolean', () => {
  it('sanitizes strings containing "true"', async () => {
    const result = asBoolean('true', '')
    expect(result).to.deep.equal(Either.right(true))
  })

  it('sanitizes strings containing "false"', async () => {
    const result = asBoolean('false', '')
    expect(result).to.deep.equal(Either.right(false))
  })

  it('does not accept non-boolean strings', async () => {
    const result = asBoolean('12abc', 'path')
    expect(result).to.deep.equal(
      Either.left([{ path: 'path', expected: 'boolean' }])
    )
  })

  it('sanitizes booleans', async () => {
    const result = asBoolean(true, '')
    expect(result).to.deep.equal(Either.right(true))
  })

  it('does not accept types other than boolean or string', async () => {
    const result = asBoolean(13, 'path')
    expect(result).to.deep.equal(
      Either.left([{ path: 'path', expected: 'boolean' }])
    )
  })
})