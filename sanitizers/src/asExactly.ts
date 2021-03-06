import { LiteralTypes, Result, Sanitizer } from './model'

export const asExactly = <T extends LiteralTypes> (expected: T): Sanitizer<T> => (value, path) => {
  if (value === expected) {
    return Result.ok(expected)
  } else {
    return Result.error([{ path, expected: `exactly ${JSON.stringify(expected)}` }])
  }
}
