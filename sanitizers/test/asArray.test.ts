import { expect } from 'chai'
import { asArray, asNumber, Result } from '../src'

describe('asArray', () => {
  it('sanitizes empty arrays', async () => {
    const asMyArray = asArray(asNumber)
    const result = asMyArray([], '')
    expect(result).to.deep.equal(Result.ok([]))
  })

  it('sanitizes non-empty arrays', async () => {
    const asMyArray = asArray(asNumber)
    const result = asMyArray([1, 2], '')
    expect(result).to.deep.equal(Result.ok([1, 2]))
  })

  it('does not-accept non-arrays', async () => {
    const asMyArray = asArray(asNumber)
    const result = asMyArray('foo', 'path')
    expect(result).to.deep.equal(
      Result.error([{ path: 'path', expected: 'array' }])
    )
  })

  it('returns errors from nested sanitizers', async () => {
    const asMyArray = asArray(asNumber)
    const result = asMyArray([1, 'a', 'b'], 'path')
    expect(result).to.deep.equal(Result.error([
      { path: 'path[1]', expected: 'number' },
      { path: 'path[2]', expected: 'number' }
    ]))
  })
})
