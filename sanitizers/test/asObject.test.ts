import { expect } from 'chai'
import { asNumber, asObject, asOptional, asString, Result } from '../src'

describe('asObject', () => {
  it('sanitizes objects', async () => {
    const asMyObject = asObject({})
    const result = asMyObject({}, '')
    expect(result).to.deep.equal(Result.ok({}))
  })

  it('does not-accept non-objects', async () => {
    const asMyObject = asObject({})
    const result = asMyObject(123, 'path')
    expect(result).to.deep.equal(
      Result.error([{ path: 'path', expected: 'object' }])
    )
  })

  it('sanitizes using nested sanitizers', async () => {
    const asMyObject = asObject({
      foo: asNumber,
      bar: asObject({
        baz: asString
      })
    })
    const value = { foo: 123, bar: { baz: 'baz' } }
    const result = asMyObject(value, 'path')
    expect(result).to.deep.equal(Result.ok(value))
  })

  it('removes unknown properties', async () => {
    const asMyObject = asObject({ x: asNumber })
    const result = asMyObject({ x: 1, y: 'foo' }, 'path')
    expect(result).to.deep.equal(Result.ok({ x: 1 }))
  })

  it('returns errors from nested sanitizers', async () => {
    const asMyObject = asObject({
      foo: asNumber,
      bar: asObject({
        baz: asString
      })
    })
    const value = { foo: false, bar: {} }
    const result = asMyObject(value, 'path')
    expect(result).to.deep.equal(Result.error([
      { path: 'path.foo', expected: 'number' },
      { path: 'path.bar.baz', expected: 'string' }
    ]))
  })

  it('adds undefined for missing optional keys', async () => {
    const asMyObject = asObject({
      foo: asOptional(asNumber)
    })
    const value = { }
    const result = asMyObject(value, 'path')
    expect(result).to.deep.equal(Result.ok({ foo: undefined }))
  })
})
