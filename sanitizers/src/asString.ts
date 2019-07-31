import { Result, Sanitizer } from './sanitizer'

export const asString: Sanitizer<string> = (value, path) =>
  typeof value === 'string'
    ? Result.ok(value)
    : Result.error([{ path, expected: 'string' }])
