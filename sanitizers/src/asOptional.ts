import { Result, Sanitizer } from './sanitizer'

export const asOptional = <T>(sanitizer: Sanitizer<T>): Sanitizer<T | undefined> =>
  (value, path) => value == null
    ? Result.ok(undefined)
    : sanitizer(value, path)
